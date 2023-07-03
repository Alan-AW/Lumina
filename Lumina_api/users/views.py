from rest_framework.views import APIView
from django.http import JsonResponse
from users.models import UserInfo, Permission
from utils.authentication.jwt_auth import create_jwt_token
from utils.methods import return_response, get_data
from serializers.user_serializers import UserLoginSerializer, permission_and_menu_ser


class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        user = request.data
        user['is_active'] = True
        user_obj = UserInfo.objects.filter(**user).first()
        if not user_obj:
            response = return_response(status=False, error='用户名或密码错误！')
        else:
            data = get_data(model=user_obj, ser_class=UserLoginSerializer, many=False)
            data['token'] = create_jwt_token({'id': user_obj.id})
            roles = user_obj.roles.all()
            queryset = Permission.objects.filter(roles__in=roles).distinct().order_by('id')
            data['permissions'] = permission_and_menu_ser(queryset)
            response = return_response(status=True, data=data, info='登陆成功！')
        return JsonResponse(response)
