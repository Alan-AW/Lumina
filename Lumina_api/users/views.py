from rest_framework.views import APIView
from django.http import JsonResponse
from users.models import UserInfo, Permission
from utils.authentication.jwt_auth import create_jwt_token
from utils.methods import return_response, get_data
from serializers.user_serializers import UserLoginSerializer, UserInfoSer, permission_and_menu_ser


class LoginView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def post(self, request, *args, **kwargs):
        user = request.data
        user_obj = None
        if user:
            user['status'] = 1
            user_obj = UserInfo.objects.filter(**user).first()
        if not user_obj:
            response = return_response(status=False, error='用户名或密码错误！')
        else:
            data = get_data(model=user_obj, ser_class=UserLoginSerializer, many=False)
            data['token'] = create_jwt_token({'id': user_obj.id})
            roles = user_obj.role
            queryset = Permission.objects.filter(roles__in=[roles.id]).distinct().order_by('id')
            data['permissions'] = permission_and_menu_ser(queryset)
            response = return_response(status=True, data=data, info='登陆成功！')
        return JsonResponse(response)


# 用户信息管理
class UserInfoView(APIView):
    def get(self, request):
        queryset = request.user.company.account.all().exclude(pk=request.user.pk)
        data = get_data(queryset, True, request, self, UserInfoSer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request, row_id=None):
        ser = UserInfoSer(data=request.data)
        if ser.is_valid():
            ser.save(**{'company': request.user.company})
            response = return_response(data=ser.data, info='用户新建成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, row_id=None):
        instance = UserInfo.objects.filter(company=request.user.company, pk=row_id).first()
        ser = UserInfoSer(instance=instance, data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(data=ser.data, info='用户信息更新成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, row_id=None):
        try:
            result = UserInfo.objects.filter(company=request.user.company, pk=row_id).delete()
            response = return_response(info=f'成功删除{result}条数据！')
        except UserInfo.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
        return JsonResponse(response)


# 修改个人信息
class UpdateUserInfo(APIView):
    # 换头像
    def post(self, request):
        pass

    # 修改个人信息
    def patch(self, request):
        pass
