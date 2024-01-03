from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from operations.models import Company
from users.models import UserInfo, Roles, Permission, Logs


# 用户登陆
class UserLoginSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    qrcode = serializers.SerializerMethodField()
    role = serializers.CharField(source='role.title')
    permissions = serializers.SerializerMethodField()

    def get_avatar(self, row):
        try:
            url = row.company.logo.url
        except Exception:
            url = ''
        return url

    def get_qrcode(self, row):
        return row.qr.qrcode.url if row.qr.qrcode else ''

    def get_permissions(self, row):
        queryset = row.role.permission.all()
        permission_list = permission_and_menu_ser(queryset)
        return permission_list

    class Meta:
        model = UserInfo
        fields = ['account', 'first_name', 'last_name', 'role', 'avatar', 'qrcode', 'permissions']


class PermissionSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(
        required=True, min_length=1, max_length=16,
        validators=[UniqueValidator(Permission.objects.all(), message='该权限名称已存在!')]
    )
    url = serializers.CharField(
        required=True, min_length=1, max_length=128,
        validators=[UniqueValidator(Permission.objects.all(), message='该权限路径已存在!')]
    )
    isNaviLink = serializers.BooleanField(required=True, error_messages={'required': 'isNaviLink为是否是菜单项，必填！'})
    pid_id = serializers.IntegerField(allow_null=True, required=False)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

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
        fields = ['id', 'title', 'url', 'isNaviLink', 'pid_id', 'create_time', 'update_time']


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
    qrcode_url = serializers.SerializerMethodField()
    language = serializers.IntegerField()
    language_label = serializers.CharField(source='get_language_display', read_only=True)
    company = serializers.SlugRelatedField(slug_field='id', queryset=Company.objects)
    company_label = serializers.CharField(source='company.name', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    def get_qrcode_url(self, row):
        return row.qr.qrcode.url

    class Meta:
        model = UserInfo
        fields = '__all__'


# 角色管理
class RolesSer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Roles
        fields = '__all__'


# 日志查看
class LogsSer(serializers.ModelSerializer):
    command_label = serializers.CharField(source='get_command_display', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Logs
        fields = '__all__'
