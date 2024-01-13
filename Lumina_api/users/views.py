from rest_framework.views import APIView
from django.http import JsonResponse

from operations.base_view import BaseView
from users.models import UserInfo, Permission, Roles, Logs
from utils.authentication.jwt_auth import create_jwt_token
from utils.methods import return_response, get_data
from serializers.user_serializers import UserLoginSerializer, UserInfoSer, RolesSer, PermissionSerializers, \
    permission_and_menu_ser, LogsSer
from utils.permissions.user_permission import SuperPermission
from utils.create_log import create_logs


class LoginView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def post(self, request, *args, **kwargs):
        user = request.data
        user_obj = None
        if user:
            user_obj = UserInfo.objects.filter(**user, status=1).first()
        if not user_obj:
            response = return_response(status=False, error='用户名或密码错误！')
        # elif user_obj.role.title != 'Manager':
        #     response = return_response(status=False, error='对不起您无权使用本系统!')
        else:
            ser = UserLoginSerializer(user_obj, many=False)
            data = ser.data
            data['token'] = create_jwt_token({'id': user_obj.id})
            create_logs(user_obj, UserInfo, 1, None)
            response = return_response(status=True, data=data, info='登陆成功！')
        return JsonResponse(response)


# 用户信息管理-超级用户权限
class UserInfoView(APIView):
    permission_classes = [SuperPermission]

    def get(self, request):
        queryset = UserInfo.objects.all().exclude(is_super=True)
        data = get_data(queryset, True, request, self, UserInfoSer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request, row_id=None):
        data = request.data
        ser = UserInfoSer(data=data)
        if ser.is_valid():
            ser.save()
            create_logs(request.user, UserInfo, 2, request.data)
            response = return_response(data=ser.data, info='用户创建成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, row_id=None):
        instance = UserInfo.objects.filter(pk=row_id).first()
        ser = UserInfoSer(instance=instance, data=request.data)
        if ser.is_valid():
            ser.save()
            create_logs(request.user, UserInfo, 3, request.data)
            response = return_response(data=ser.data, info='用户信息更新成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, row_id=None):
        try:
            result = UserInfo.objects.get(pk=row_id).delete()
            create_logs(request.user, UserInfo, 4, request.data)
            response = return_response(info=f'成功删除{result}条数据！', data=int(row_id))
        except UserInfo.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
        return JsonResponse(response)


# 修改个人信息-暂时不用
class UpdateUserInfo(APIView):

    def post(self, request):
        ser = UserInfoSer(instance=request.user, data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(data=ser.data, info='操作成功!')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)


# 角色管理
class RolesView(BaseView):
    create_log = True
    permission_classes = [SuperPermission]
    models = Roles
    serializer = RolesSer


# 权限管理
class PermissionView(BaseView):
    def get(self, request, get_type=None):
        if get_type == 'choices':
            # 选择属于菜单的权限
            model = Permission.objects.filter(isNaviLink=True).all()
            ser = PermissionSerializers(instance=model, many=True)
            data = ser.data
        else:
            # 生成权限管理的树结构
            queryset = Permission.objects.all().order_by('id')
            data = permission_and_menu_ser(queryset)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request, *args, **kwargs):
        ser = PermissionSerializers(data=request.data)
        if ser.is_valid():
            ser.save()
            create_logs(request.user, Permission, 2, request.data)
            response = return_response(data=ser.data, info='权限添加成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, *args, **kwargs):
        permission_obj = Permission.objects.get(id=request.data.get('id'))
        ser = PermissionSerializers(instance=permission_obj, data=request.data)
        if ser.is_valid():
            ser.save()
            create_logs(request.user, Permission, 3, request.data)
            response = return_response(data=ser.data, info='权限更新成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, *args, **kwargs):
        queryset = Permission.objects.filter(id=request.data)
        if queryset.delete()[0] > 0:
            create_logs(request.user, Permission, 4, request.data)
            response = return_response(info='删除成功!')
        else:
            response = return_response(info='删除失败!')
        return JsonResponse(response)


# 日志查看
class LogsView(APIView):
    permission_classes = [SuperPermission]

    def get(self, request):
        if request.user.is_super:
            # 超级用户查看所有日志
            queryset = Logs.objects.all()
        else:
            # 管理员查看当前公司下的所有用户的日志
            username = [i.account for i in request.user.company.account.all()]
            queryset = Logs.objects.filter(username__in=username)
        data = get_data(queryset, True, request, self, LogsSer)
        response = return_response(data=data)
        return JsonResponse(response)
