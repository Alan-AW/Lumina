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
    register = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    roles = serializers.ListField(source='roles.all.values')

    # permission = serializers.SerializerMethodField()

    def get_avatar(self, row):
        return sys.API_BASE_URL + row.avatar.avatar.url if row.avatar.avatar else ''

    # def get_permission(self, row):
    #     permissions = row.roles.all().values("permission__key", "permission__title").distinct()
    #     permission_list = [{'url': i['permission__key'], 'title': i['permission__title']} for i in list(permissions)]
    #     return permission_list

    class Meta:
        model = UserInfo
        fields = ['username', 'default', 'is_active', 'avatar', 'register', 'roles']


class UserFormSerializer(serializers.ModelSerializer):
    # 添加用户&查询所有用户
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(
        min_length=1, max_length=8, required=True,
        validators=[UniqueValidator(UserInfo.objects.all(), message='该用户名已存在！')],
        error_messages={
            'min_length': '用户名至少需要一个字符长度',
            'max_length': '用户名最大不得超过8个字符长度'
        }
    )
    password = serializers.CharField(
        min_length=8, max_length=32, required=True,
        validators=[password_validate],
        error_messages={
            'min_length': '密码至少需要8个字符长度',
            'max_length': '密码最大不得超过32个字符长度'
        }
    )
    default = serializers.BooleanField()
    is_active = serializers.BooleanField()
    tel = serializers.CharField(validators=[tel_validate])
    avatar = serializers.SerializerMethodField(read_only=True)
    register = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    roles = serializers.SlugRelatedField(
        required=True, queryset=Roles.objects.all(), many=True, slug_field='id'
    )
    role = serializers.SerializerMethodField()

    def get_avatar(self, row):
        try:
            url = sys.API_BASE_URL + row.avatar.avatar.url
        except Exception as e:
            url = None
        return url

    def get_role(self, row):
        roles_obj_list = row.roles.all()
        roles_id_list = []
        for i in roles_obj_list:
            roles_id_list.append({
                "key": i.id,
                "label": i.title
            })
        return roles_id_list

    # def create(self, validated_data):
    #     # 创建新用户——已经通过信号自动创建了头像
    #     roles_list = validated_data.pop('roles')
    #     try:
    #         with atomic():
    #             new_user = UserInfo.objects.create(**validated_data)
    #             new_user.roles.add(*roles_list)
    #             UserAvatar.objects.create(user=new_user)
    #     except Exception as e:
    #         raise SystemExit(f"数据库错误：{str(e)}")
    #     return new_user

    class Meta:
        model = UserInfo
        fields = [
            'id', 'username', 'password', 'default', 'is_active',
            'avatar', 'register', 'roles', 'role', 'tel'
        ]


class UserUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    password = serializers.CharField(
        required=False, write_only=True, validators=[password_validate]
    )
    confirm_password = serializers.CharField(required=False)

    def validate_username(self, value):
        if not value and 1 < len(value) < 9:
            raise exceptions.ValidationError('用户名字符长度为1-8！')
        elif UserInfo.objects.filter(username=value).exists():
            raise exceptions.ValidationError('用户名已存在！')
        else:
            return value

    def validate(self, attr):
        password = attr.get('password')
        confirm_password = attr.get('confirm_password')
        if password and confirm_password:
            if password != confirm_password:
                raise serializers.ValidationError('两次输入密码不一致')
            attr.pop('confirm_password')
        return attr

    class Meta:
        model = UserInfo
        fields = ['username', 'password', 'confirm_password']


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
            raise serializers.ValidationError(f'图片大小不得超过1MB！当前大小为{size}MB'.format(size=size))
        return data

    class Meta:
        model = UserAvatar
        fields = ['avatar_url', 'avatar']


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
