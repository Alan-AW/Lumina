from rest_framework.views import APIView
from django.http import JsonResponse
from operations.models import Room, Unit, Temperature, Species, RoomDesc, Lighting, Cultivars, Models, Triggers, \
    Action, Instruction, Phases, EnvironmentalOptions, Company
from serializers.operations_serializers import RoomSer, UnitSer, ChoicesRoomSer, \
    ChoicesRoleSer, ExportDataSer, CompanySer
from serializers.three_data_serializers import SpeciesDataSer, CultivarsDataSer, ModelsDataSer, PhasesDataSer, \
    InstructionDataSer, ActionDataSer, ChoicesCompanySer, TriggersDataSer, EnvironmentalOptionsChoicesSer
from users.models import Roles
from utils.methods import return_response, get_data
from operations.base_view import BaseView
from utils.permissions.user_permission import SuperPermission
from utils.create_log import create_logs


# 房间管理
class RoomView(APIView):
    permission_classes = [SuperPermission]

    def get(self, request):
        if request.user.is_super:
            queryset = Room.objects.all()
        else:
            queryset = request.user.company.rooms.all()
        data = get_data(queryset, True, request, self, RoomSer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request, row_id=None):
        ser = RoomSer(data=request.data)
        if ser.is_valid():
            ser.save()
            create_logs(request.user, Room, 2, request.data)
            response = return_response(data=ser.data, info='房间信息添加成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, row_id=None):
        queryset = Room.objects.get(id=row_id)
        ser = RoomSer(instance=queryset, data=request.data)
        if ser.is_valid():
            ser.save()
            create_logs(request.user, Room, 3, request.data)
            response = return_response(data=ser.data, info='房间信息更新成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, row_id=None):
        try:
            data = Room.objects.filter(id=row_id).delete()
            create_logs(request.user, Room, 4, request.data)
            response = return_response(data=int(row_id), info=f'成功删除{data}条数据！')
        except Room.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
        return JsonResponse(response)


# 机器管理
class UnitView(APIView):
    permission_classes = [SuperPermission]

    def get(self, request):
        if request.user.is_super:
            queryset = Unit.objects.all()
            data = get_data(queryset, True, request, self, UnitSer)
        else:
            queryset = Unit.objects.filter(room__in=request.user.company.rooms.all()).all()
            data = get_data(queryset, True, request, self, UnitSer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request, row_id=None):
        ser = UnitSer(data=request.data)
        if ser.is_valid():
            ser.save()
            create_logs(request.user, Unit, 2, request.data)
            response = return_response(data=ser.data, info='机器添加成功!')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, row_id=None):
        queryset = Unit.objects.get(id=row_id)
        ser = UnitSer(instance=queryset, data=request.data)
        if ser.is_valid():
            ser.save()
            create_logs(request.user, Unit, 3, request.data)
            response = return_response(data=ser.data, info='机器信息修改成功!')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, row_id):
        try:
            data = Unit.objects.filter(id=row_id).delete()
            create_logs(request.user, Unit, 4, row_id)
            response = return_response(data=row_id, info=f'已删除{data}条数据！')
        except Unit.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
        return JsonResponse(response)


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


# 公司管理
class CompanyView(BaseView):
    create_log = True
    models = Company
    serializer = CompanySer
    permission_classes = [SuperPermission]

    def get(self, request, row_id=None):
        if request.user.is_super:
            queryset = Company.objects.all()
            data = get_data(queryset, True, request, self, CompanySer, True)
        elif request.user.role.title == 'Manager':
            queryset = request.user.company
            data = get_data(queryset, True, request, self, CompanySer, False)
        else:
            data = None
        response = return_response(data=data)
        return JsonResponse(response)


# 更换公司logo
class CompanyUploadLogo(APIView):
    permission_classes = [SuperPermission]

    def post(self, request, row_id):
        try:
            company = Company.objects.get(id=row_id)
            company.logo = request.FILES.get('data')
            company.save()
            create_logs(request.user, Company, 3, {'logo_changed': company.logo.url})
            response = return_response(data={"id": company.pk, "logo": company.logo.url}, info='上传成功！')
        except Company.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
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


# 传感器请求保存数据
class SaveSensorDataView(APIView):
    """
    这里有一个可优化项，客户加钱就做，不加钱就不管：
    该接口取消了所有安全性校验，容易被恶意攻击，
    导致疯狂传输json数据扰乱正常数据和破坏数据库
    """
    authentication_classes = []  # 取消认证
    permission_classes = []  # 取消权限
    throttle_classes = []  # 取消节流

    def post(self, request, types):
        map_http_request_operate = {
            'temperature': [Temperature, request.data, 'temperature'],  # 温度
            'lighting': [Lighting, request.data, 'lighting'],  # 光照
            'rooms': [RoomDesc, request.data],  # 房间
        }
        operate_list = map_http_request_operate.get(types)
        if not operate_list:
            response = return_response(status=False, error='The request interface is incorrect！')
            return JsonResponse(response)
        model, val, key = operate_list
        val['json_val'] = val.pop(key)
        model.objects.create(**val)
        response = return_response(info='The data is saved')
        return JsonResponse(response)


# 树型结构6张表导出
class ExportThree(APIView):
    def get(self, request):
        data = get_data(Species, False, request, self, ExportDataSer)
        response = return_response(data=data)
        return JsonResponse(response)


# 树型结构分表数据管理
class SpeciesView(BaseView):
    models = Species
    serializer = SpeciesDataSer


class CultivarsView(BaseView):
    models = Cultivars
    serializer = CultivarsDataSer
    get_filter = 'species_id'


class ModelsView(BaseView):
    models = Models
    serializer = ModelsDataSer
    get_filter = 'cultivars_id'


class PhasesView(BaseView):
    models = Phases
    serializer = PhasesDataSer
    get_filter = 'f_model_id'


class InstructionView(BaseView):
    models = Instruction
    serializer = InstructionDataSer
    get_filter = 'phases_id'


class ActionView(BaseView):
    models = Action
    serializer = ActionDataSer
    get_filter = 'base_id'


class TriggersView(BaseView):
    models = Triggers
    serializer = TriggersDataSer
    get_filter = 'phases_id'


class ChoicesEnvironmentalOptions(APIView):
    def get(self, request):
        queryset = EnvironmentalOptions.objects.all()
        ser = EnvironmentalOptionsChoicesSer(queryset, many=True)
        response = return_response(data=ser.data)
        return JsonResponse(response)
