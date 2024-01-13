from rest_framework.views import APIView
from django.http import JsonResponse
from operations.models import Room, EnvironmentalOptions, Company, UnitSettingsList
from serializers.operations_serializers import ChoicesRoomSer, ChoicesRoleSer
from serializers.three_data_serializers import ChoicesCompanySer, EnvironmentalOptionsChoicesSer,\
    UnitSettingsListChoicesCnSer, UnitSettingsListChoicesEnSer
from users.models import Roles
from utils.methods import return_response
from utils.permissions.user_permission import SuperPermission


# 选择房间
class ChoicesRoomView(APIView):
    permission_classes = [SuperPermission]

    def get(self, request):
        return self.public_results(request)

    def post(self, request):
        return self.public_results(request)

    def public_results(self, request):
        if request.user.is_super:
            queryset = Room.objects.all()
        else:
            queryset = request.user.company.rooms.all()
        ser = ChoicesRoomSer(queryset, many=True)
        response = return_response(data=ser.data)
        return JsonResponse(response)


# 选择角色
class ChoicesRoleView(APIView):
    def get(self, request):
        return self.public_results(request)

    def post(self, request):
        return self.public_results(request)

    def public_results(self, request):
        queryset = Roles.objects.all()
        ser = ChoicesRoleSer(queryset, many=True)
        response = return_response(data=ser.data)
        return JsonResponse(response)


# 选择公司
class ChoicesCompanyView(APIView):
    def get(self, request):
        if request.user.is_super:
            queryset = Company.objects.all()
            ser = ChoicesCompanySer(queryset, many=True)
            response = return_response(data=ser.data)
        else:
            queryset = request.user.company
            ser = ChoicesCompanySer(queryset, many=False)
            response = return_response(data=[ser.data])
        return JsonResponse(response)


class ChoicesEnvironmentalOptions(APIView):
    def get(self, request):
        queryset = EnvironmentalOptions.objects.all()
        ser = EnvironmentalOptionsChoicesSer(queryset, many=True)
        response = return_response(data=ser.data)
        return JsonResponse(response)


class ChoicesUnitSettings(APIView):
    permission_classes = [SuperPermission]

    def get(self, request):
        language = request.query_params.get('language')
        queryset = UnitSettingsList.objects.all()
        if language == 'cn':
            ser = UnitSettingsListChoicesCnSer(queryset, many=True)
        else:
            ser = UnitSettingsListChoicesEnSer(queryset, many=True)
        response = return_response(data=ser.data)
        return JsonResponse(response)
