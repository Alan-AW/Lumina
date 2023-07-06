import re
from django.db.transaction import atomic
from rest_framework import exceptions
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from operations.models import Company
from utils.validator.public_validate import password_validate, tel_validate
from users.models import UserInfo, Roles, UserAvatar, Permission
from django.conf import settings as sys


# 用户登陆
class UserLoginSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    qrcode = serializers.SerializerMethodField()
    role = serializers.CharField(source='role.title')
    permission = serializers.SerializerMethodField()

    def get_avatar(self, row):
        try:
            url = sys.API_BASE_URL + row.avatar.avatar.url
        except Exception:
            url = ''
        return url

    def get_qrcode(self, row):
        return sys.API_BASE_URL + row.avatar.qrcode.url if row.avatar.qrcode else ''

    def get_permission(self, row):
        permissions = row.role.permission.all().values("url", "title", "pid").distinct()
        permission_list = [{'url': i['url'], 'title': i['title'], 'pid': i['pid']} for i in list(permissions)]
        return permission_list

    class Meta:
        model = UserInfo
        fields = ['account', 'first_name', 'last_name', 'role', 'avatar', 'qrcode', 'permission']


class PermissionSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(
        required=True, min_length=1, max_length=16,
        validators=[UniqueValidator(Permission.objects.all(), message='该权限名称已存在!')]
    )
    key = serializers.CharField(
        required=True, min_length=1, max_length=128,
        validators=[UniqueValidator(Permission.objects.all(), message='该权限路径已存在!')]
    )
    isNaviLink = serializers.BooleanField(required=True, error_messages={'required': 'isNaviLink为是否是菜单项，必填！'})
    pid_id = serializers.IntegerField(allow_null=True, required=False)

    def validate_pid_id(self, value):
        if value is not None:
            if not isinstance(value, int):
                raise serializers.ValidationError("pid字段必须为一个整数！")
            has_value = Permission.objects.filter(id=value).first()
            if not has_value:
                raise serializers.ValidationError("pid不存在！")
            if not has_value.isNaviLink:
                raise serializers.ValidationError("该pid所对应的权限不是一个menu！")
        return value

    class Meta:
        model = Permission
        fields = ['id', 'title', 'key', 'isNaviLink', 'pid_id']


def build_tree(permission_dict, pid=None):
    data = []
    for k, v in permission_dict.items():
        if v.pid_id == pid:
            ser = PermissionSerializers(v, many=False)
            node = ser.data
            child = build_tree(permission_dict, k)
            if child:
                node['children'] = child
            data.append(node)
    return data


# 菜单与权限合并生成
def permission_and_menu_ser(queryset):
    permission_dict = {i.id: i for i in queryset}
    data = build_tree(permission_dict)
    return data


# 用户管理
class UserInfoSer(serializers.ModelSerializer):
    account = serializers.CharField(max_length=32, validators=[UniqueValidator(queryset=UserInfo.objects.all())])
    password = serializers.CharField(max_length=64)
    first_name = serializers.CharField(max_length=32)
    last_name = serializers.CharField(max_length=32)
    role = serializers.SlugRelatedField(slug_field='id', queryset=Roles.objects)
    role_label = serializers.CharField(source='role.title', read_only=True)
    status = serializers.IntegerField()
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    avatar_url = serializers.SerializerMethodField()
    qrcode_url = serializers.SerializerMethodField()
    chinese = serializers.IntegerField()
    chinese_label = serializers.CharField(source='get_chinese_display', read_only=True)
    company = serializers.SlugRelatedField(slug_field='id', queryset=Company.objects)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    def get_avatar_url(self, row):
        try:
            url = sys.API_BASE_URL + row.avatar.avatar.url
        except Exception:
            url = ''
        return url

    def get_qrcode_url(self, row):
        return sys.API_BASE_URL + row.avatar.qrcode.url

    class Meta:
        model = UserInfo
        fields = '__all__'


# 更新用户头像
class UserAvatarSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.ImageField(write_only=True)

    def get_avatar_url(self, row):
        url = None
        if row.avatar:
            url = sys.API_BASE_URL + row.avatar.url
        return url

    def validate(self, data):
        avatar = data.get('avatar')
        if avatar is None:
            raise serializers.ValidationError('头像文件必须上传！')
        if avatar.size / 1024 / 1000 > 1:
            size = round(avatar.size / 1024 / 1000, 2)
            raise serializers.ValidationError(f'图片大小不得超过1MB！当前大小为{size}MB')
        return data

    class Meta:
        model = UserAvatar
        fields = ['avatar_url', 'avatar']
