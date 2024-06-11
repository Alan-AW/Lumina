from rest_framework.views import APIView
from django.http import JsonResponse
from operations.models import Room, EnvironmentalOptions, Company, UnitSettingsList, Cultivar, Algorithm
from serializers.operations_serializers import ChoicesRoomSer, ChoicesRoleSer
from serializers.three_data_serializers import ChoicesCompanySer, EnvironmentalOptionsChoicesSer, \
    UnitSettingsListChoicesCnSer, UnitSettingsListChoicesEnSer, ChoicesAlgorithmCnSer, ChoicesAlgorithmEnSer
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


# 废弃接口
class ChoicesEnvironmentalOptions(APIView):
    def get(self, request):
        queryset = EnvironmentalOptions.objects.all()
        ser = EnvironmentalOptionsChoicesSer(queryset, many=True)
        response = return_response(data=ser.data)
        return JsonResponse(response)


# 选择设备设置项
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


# 选择品类算法
class CultivarChoicesAlgorithmView(APIView):
    permission_classes = [SuperPermission]

    def get(self, request):
        language = request.query_params.get('language')
        en = language == 'en'
        q = Algorithm.objects.all().order_by('id')
        if en:
            ser = ChoicesAlgorithmEnSer(q, many=True)
        else:
            ser = ChoicesAlgorithmCnSer(q, many=True)
        data = ser.data
        response = return_response(data=data)
        return JsonResponse(response)


# 查询品类算法
class GetCultivarAlgorithmView(APIView):
    permission_classes = [SuperPermission]

    def get(self, request, row_id):
        cultivar = Cultivar.objects.filter(pk=row_id).first()
        if not cultivar:
            response = return_response(status=False, error=f'未找到id为 {row_id} 的品类')
            return JsonResponse(response)
        queryset = cultivar.algorithm.all().order_by('id')
        data = [item.id for item in queryset]
        response = return_response(data=data)
        return JsonResponse(response)


# 控制台为公司分配品类的品类下拉列表-支持国际化
class ChoicesCultivarsView(APIView):
    permission_classes = [SuperPermission]

    def get(self, request):
        query = request.query_params.dict().get('language')
        if query == 'en':
            queryset = Cultivar.objects.all().values('id', 'name_en')
            data = [{"id": item['id'], 'title': item['name_en']} for item in queryset]
        else:
            queryset = Cultivar.objects.all().values('id', 'name_cn')
            data = [{"id": item['id'], 'title': item['name_cn']} for item in queryset]
        response = return_response(data=data)
        return JsonResponse(response)
