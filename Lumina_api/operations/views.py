from rest_framework.views import APIView
from django.http import JsonResponse
from operations.models import Room, Unit, Temperature, Species, RoomDesc, Lighting, Cultivars, Models, Triggers, \
    Action, Instruction, Phases, Company, UnitSettingsList, UnitSetting, Cultivar, Algorithm
from serializers.operations_serializers import RoomSer, UnitSer, ExportDataSer, CompanySer, UnitSettingsListSer, \
    UnitSettingSer, CultivarSer, AlgorithmSer, GetUnitsOnlineSerializer
from serializers.three_data_serializers import SpeciesDataSer, CultivarsDataSer, ModelsDataSer, PhasesDataSer, \
    InstructionDataSer, ActionDataSer, TriggersDataSer
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


# 机器功能管理
class UnitSettingView(APIView):
    permission_classes = [SuperPermission]

    def get(self, request, unit_id):
        queryset = UnitSetting.objects.filter(unit_id=unit_id)
        ser = UnitSettingSer(queryset, many=True)
        data = ser.data
        response = return_response(data=data)
        return JsonResponse(response)

    def patch(self, request, unit_id):
        settings = request.data.get('settings')
        if not settings or not isinstance(settings, list):
            response = return_response(status=False, error='请选择配置项！')
            return JsonResponse(response)
        try:
            unit_obj = Unit.objects.get(id=unit_id)
            # 取出现有的配置项 id 列表
            unit_cmd_ids = [unit.cmd.id for unit in UnitSetting.objects.filter(unit_id=unit_id)]
            if not unit_cmd_ids:
                add_list = settings
            else:
                # 取交集
                intersection = list(set(settings) & set(unit_cmd_ids))
                # 分别计算原始数据中要删除的部分和新数据中要新增的部分
                add_list = list(set(settings) - set(intersection))
                del_list = list(set(unit_cmd_ids) - set(intersection))
                # 删除旧的配置
                UnitSetting.objects.filter(unit_id=unit_id, cmd_id__in=del_list).delete()
            # 创建新的功能配置
            for i in add_list:
                UnitSetting.objects.create(unit_id=unit_id, cmd_id=i)
        except Unit.DoesNotExist:
            return_response(status=False, error=f'未找到id为{unit_id}的设备！')
        response = return_response(info='设置成功！')
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


# 设备设置项列表管理
class UnitSettingsListView(BaseView):
    permission_classes = [SuperPermission]
    models = UnitSettingsList
    serializer = UnitSettingsListSer


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


# 查询所有在线设备和不在线设备-2024-3-16
class GetUnitOnlineView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def get(self, request):
        ser = GetUnitsOnlineSerializer(queue_name='execution_command_queue')
        data = ser.data
        return JsonResponse(return_response(data=data))


# 查询指定deviceId设备详情,该接口用于查询脚本监听的mq队列存入的数据，用device_id进行查询值
class UnitInfoView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def get(self, request, device_id):
        try:
            unit = Unit.objects.get(deviceId=device_id)
            ser = UnitSer(unit, many=False)
            response = return_response(data=ser.data)
        except Unit.DoesNotExist:
            response = return_response(status=False, error='deviceId错误！')
        return JsonResponse(response)


# 品类管理
class CultivarView(BaseView):
    permission_classes = [SuperPermission]
    models = Cultivar
    serializer = CultivarSer


# 品类管理分配算法
class CultivarAlgorithmView(APIView):
    permission_classes = [SuperPermission]

    def post(self, request):
        cultivar_id = request.data.get('id')
        algorithm_list = request.data.get('algorithm')
        cultivar_obj = Cultivar.objects.filter(pk=cultivar_id).first()
        if not cultivar_obj:
            response = return_response(status=False, error=f'未找到id为{cultivar_id}的品类!')
            return JsonResponse(response)
        cultivar_obj.algorithm.set(algorithm_list)
        response = return_response(info='操作成功！')
        return JsonResponse(response)


# 算法管理
class AlgorithmView(BaseView):
    permission_classes = [SuperPermission]
    models = Algorithm
    serializer = AlgorithmSer


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

    def get_queryset(self, request, *args, **kwargs):
        queryset = self.models.objects.filter(species_id=kwargs.get('row_id'))
        return queryset


class ModelsView(BaseView):
    models = Models
    serializer = ModelsDataSer

    def get_queryset(self, request, *args, **kwargs):
        queryset = self.models.objects.filter(cultivars_id=kwargs.get('row_id'))
        return queryset


class PhasesView(BaseView):
    models = Phases
    serializer = PhasesDataSer

    def get_queryset(self, request, *args, **kwargs):
        queryset = self.models.objects.filter(f_model_id=kwargs.get('row_id'))
        return queryset


class InstructionView(BaseView):
    models = Instruction
    serializer = InstructionDataSer

    def get_queryset(self, request, *args, **kwargs):
        queryset = self.models.objects.filter(phases_id=kwargs.get('row_id'))
        return queryset


class ActionView(BaseView):
    models = Action
    serializer = ActionDataSer

    def get_queryset(self, request, *args, **kwargs):
        queryset = self.models.objects.filter(base_id=kwargs.get('row_id'))
        return queryset


class TriggersView(BaseView):
    models = Triggers
    serializer = TriggersDataSer

    def get_queryset(self, request, *args, **kwargs):
        queryset = self.models.objects.filter(phases_id=kwargs.get('row_id'))
        return queryset
