import re
from django.db.transaction import atomic
from rest_framework import exceptions
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from utils.validator.public_validate import password_validate, tel_validate
from users.models import UserInfo, Roles, UserAvatar, Permission
from django.conf import settings as sys


class UserLoginSerializer(serializers.ModelSerializer):
    # 用户登陆
    avatar = serializers.SerializerMethodField()
    qrcode = serializers.SerializerMethodField()
    role = serializers.CharField(source='role.title')
    permission = serializers.SerializerMethodField()

    def get_avatar(self, row):
        return sys.API_BASE_URL + row.avatar.avatar.url if row.avatar.avatar else ''

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
