import datetime
import json
import time

import pytz
from django.db.transaction import atomic
from rest_framework.views import APIView
from django.http import JsonResponse

from device.models import MessageQueueModel
from operations.models import Room, Unit, Temperature, Species, RoomDesc, Lighting, Cultivars, Models, Triggers, \
    Action, Instruction, Phases, Company, UnitSettingsList, UnitSetting, Cultivar, Algorithm, UnitPlantDesc, \
    CompanyCultivarAlgorithm
from serializers.operations_serializers import RoomSer, UnitSer, ExportDataSer, CompanySer, UnitSettingsListSer, \
    UnitSettingSer, CultivarSer, AlgorithmSer
from serializers.three_data_serializers import SpeciesDataSer, CultivarsDataSer, ModelsDataSer, PhasesDataSer, \
    InstructionDataSer, ActionDataSer, TriggersDataSer
from utils.methods import return_response, get_data, get_now_timer, is_within_date_range, computed_sowing_time
from operations.base_view import BaseView
from utils.permissions.user_permission import SuperPermission, ExcludeSuperPermission
from utils.create_log import create_logs
from device.rabbit_mq.producer import start


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
    # authentication_classes = []
    # permission_classes = []
    # throttle_classes = []
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

    def get(self, request, row_id=None):
        if request.user.is_super:
            queryset = Company.objects.all()
            data = get_data(queryset, True, request, self, CompanySer, True)
        else:
            queryset = request.user.company
            data = get_data(queryset, True, request, self, CompanySer, False)
        response = return_response(data=data)
        return JsonResponse(response)


# 公司可种植品类管理
class CompanyCultivarsView(APIView):
    permission_classes = [SuperPermission]

    # 修改指定公司允许种植的品类id列表
    def post(self, request, company_id):
        data = request.data.get('id_list')
        if not data:
            response = return_response(status=False, error=f'请至少选择一个品类！')
            return JsonResponse(response)
        queryset = Company.objects.filter(pk=company_id).first()
        if not queryset:
            response = return_response(status=False, error=f'未找到ID为{company_id}的公司！')
            return JsonResponse(response)
        queryset.allow_cultivars.set(data)
        response = return_response(info='更新成功！')
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


# 公司设备种植作物算法详情
class CompanyUnitDescView(APIView):

    def get(self, request, company_id):
        # 设备ID，品类名称，两个时间，两个算法json
        # 国际化
        is_en = request.GET.get('language') == 'en'
        # 先搜索出，该公司下的所有设备
        unit_list = Unit.objects.filter(room__company_id=company_id).all()
        result = []
        for unit in unit_list:
            # 读取最新的激活的且在种植周期内的种植记录
            plant = unit.plant_desc.filter(status=True).order_by('-id').first()
            # 如果有激活的种植周期记录
            if plant:
                # 计算当前是否还在种植周期内
                create_time = plant.create_time.strftime('%Y-%m-%d %H:%M:%S')
                cycle = plant.cultivar.cycle
                is_in_cycle = is_within_date_range(create_time, cycle)
                # 如果在种植周期内，读取数据返回
                if is_in_cycle:
                    unit_queue = MessageQueueModel.objects.filter(device_id=unit.deviceId).order_by('-id').first()
                    if not unit_queue:
                        unit_queue = {}
                    else:
                        unit_queue = unit_queue.content
                    result.append(
                        {
                            'id': plant.id,
                            'serial_number': unit.serial_number,
                            'device_id': unit.deviceId,
                            'cultivar': plant.cultivar.name_en if is_en else plant.cultivar.name_cn,
                            'create_time': plant.create_time.strftime('%Y-%m-%d %H:%M:%S'),
                            # 'sowing_time': computed_sowing_time(plant.create_time),  # 已种植时间
                            # 'cycle': cycle,  # 作物周期
                            'unit_cycle': plant.algorithm,  # 种植的算法详情
                            'unit_queue': unit_queue  # 传感器推送的数据
                        }
                    )
            else:
                # 如果不在周期内，也返回设备信息
                result.append(
                    {
                        'id': None,
                        'serial_number': unit.serial_number,
                        'device_id': unit.deviceId,
                        'cultivar': 'None' if is_en else '无',
                        'create_time': '',
                        'sowing_time': '0',
                        'cycle': '0',
                        'unit_cycle': {},
                        'unit_queue': {}
                    }
                )
        response = return_response(data=result)
        return JsonResponse(response)


# 刷新按钮
class ReloadJsonValView(APIView):

    def get(self, request, plant_id):
        plant_desc = UnitPlantDesc.objects.filter(pk=plant_id).first()
        unit_device_id = plant_desc.unit.deviceId
        unit_queue = MessageQueueModel.objects.filter(device_id=unit_device_id).order_by('-id').first()
        if unit_queue:
            unit_queue = unit_queue.content
        else:
            unit_queue = {}
        if plant_desc:
            data = {
                'unit_cycle': plant_desc.algorithm,
                'unit_queue': unit_queue
            }
            response = return_response(data=data)
        else:
            response = return_response(status=False)
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
"""
24-3-30查询所有在线和不在线设备调整：
设备表加一个字段，给一个接口给核心ping，
间隔30s带device_id过来ping，然后将ping的时间记录到这个字段内
查询在线设备的时候，只需要遍历所有设备的ping时间与当前时间来进行比对，小于60s，即为在线设备
"""


class PingUnitTimerView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def get(self, request, device_id):
        timer = get_now_timer()
        unit_obj = Unit.objects.filter(deviceId=device_id).first()
        if not unit_obj:
            response = return_response(status=False, error='设备ID错误！')
        else:
            unit_obj.ping = timer
            unit_obj.save()
            response = return_response(info='ok', data=timer)
        return JsonResponse(response)


class GetUnitOnlineView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def get(self, request):
        data_list = list(Unit.objects.all().values('ping', 'deviceId'))
        data = self.filter_online_unit(data_list)
        response = return_response(data=data)
        return JsonResponse(response)

    def filter_online_unit(self, data_list: list) -> dict:
        online = []
        outline = []
        now_timer = get_now_timer()
        for item in data_list:
            ping, device_id = item.values()
            if ping:
                diff = int(now_timer) - int(ping)
                if diff <= 60:
                    online.append(device_id)
                else:
                    outline.append(device_id)
            else:
                outline.append(device_id)
        return {'online': online, 'offline': outline}


# 查询指定设备算法详情,该接口用于查询脚本监听的mq队列存入的数据，用种植记录ID进行查询值
class UnitInfoView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def get(self, request, device_id):
        try:
            queryset = UnitPlantDesc.objects.filter(unit__deviceId=device_id, status=True).order_by('-id').first()
            if queryset:
                data = queryset.algorithm
            else:
                data = []
            response = return_response(data=data)
        except Unit.DoesNotExist:
            response = return_response(status=False, error='deviceId错误！')
        return JsonResponse(response)


# 品类管理
class CultivarView(BaseView):
    # permission_classes = [SuperPermission]
    models = Cultivar
    serializer = CultivarSer

    def get_queryset(self, request, *args, **kwargs):
        if request.user.is_super:
            company_id = request.query_params.get('company_id')
            queryset = Company.objects.filter(pk=company_id).first().allow_cultivars.all()
        else:
            queryset = request.user.company.allow_cultivars.all()
        return queryset

    def get(self, request, row_id=None):
        queryset = self.get_queryset(request, row_id)
        data = get_data(queryset, True, request, self, self.serializer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request):
        if request.user.is_super:
            ser = self.serializer(data=request.data)
            if ser.is_valid():
                ser.save()
                if self.create_log:
                    create_logs(request.user, self.models, 2, request.data)
                response = return_response(data=ser.data, info='添加操作成功！')
            else:
                response = return_response(status=False, error=ser.errors)
        else:
            response = return_response(status=False, error='没有权限！')
        return JsonResponse(response)

    def patch(self, request, row_id):
        if request.user.is_super:
            queryset = self.models.objects.get(id=row_id)
            ser = self.serializer(instance=queryset, data=request.data)
            if ser.is_valid():
                ser.save()
                if self.create_log:
                    create_logs(request.user, self.models, 3, request.data)
                response = return_response(data=ser.data, info='信息更新成功！')
            else:
                response = return_response(status=False, error=ser.errors)
        else:
            response = return_response(status=False, error='没有权限！')
        return JsonResponse(response)

    def delete(self, request, row_id):
        if request.user.is_super:
            try:
                data = self.models.objects.filter(id=row_id).delete()
                if self.create_log:
                    create_logs(request.user, self.models, 4, row_id)
                response = return_response(data=int(row_id), info=f'成功删除{data}条数据！')
            except self.models.DoesNotExist as e:
                response = return_response(status=False, error=f'{e}')
        else:
            response = return_response(status=False, error='没有权限！')
        return JsonResponse(response)


# 管理员为品类管理分配算法
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


# 公司管理员控制台为品类编写算法-查询与提交品类算法
class CultivarAlgorithmCmdView(APIView):
    # permission_classes = [ExcludeSuperPermission]

    def get(self, request, cultivar_id):
        # 查询品类
        cultivar = Cultivar.objects.filter(id=cultivar_id).first()
        if not cultivar:
            response = return_response(status=False, error='未找到该品类')
            return JsonResponse(response)
        company = request.user.company
        # 查询品类支持的算法
        algorithm = cultivar.algorithm.all()
        data = []
        # 遍历算法
        for item in algorithm:
            # 查询该公司是否对这个算法进行了编辑
            has_record = CompanyCultivarAlgorithm.objects.filter(
                company=company, cultivar=cultivar, algorithm=item
            ).first()
            # 读取指令集：如果编辑了，那就使用编辑的指令集，否则使用算法默认值
            json = item.cmd if not has_record else has_record.cmd
            data.append({
                'id': item.id,
                'title': f'{item.subject_cn}:{item.title_cn}',
                'json': json
            })
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request, cultivar_id):
        data = request.data  # {"10": {...}, ...} key：算法ID，value：指令集json
        algorithm_ids = data.keys()
        if len(algorithm_ids) < 1:
            response = return_response(status=False, error='请选择算法！')
            return JsonResponse(response)
        company_id = request.user.company.id
        try:
            with atomic():
                for ago in algorithm_ids:
                    CompanyCultivarAlgorithm.objects.update_or_create(
                        company_id=company_id, cultivar_id=cultivar_id, algorithm_id=ago,
                        defaults={'cmd': data[ago]}
                    )
                response = return_response(info='操作成功')
        except Exception:
            response = return_response(status=False, error='操作失败')
        return JsonResponse(response)


# 算法管理
class AlgorithmView(BaseView):
    permission_classes = [SuperPermission]
    models = Algorithm
    serializer = AlgorithmSer

    def get(self, request, row_id=None):
        if 'get' not in self.allowed_methods:
            return JsonResponse(return_response(status=False, info='请求方法错误！'))
        queryset = Algorithm.objects.all()
        ser = AlgorithmSer(queryset, many=True)
        response = return_response(data=ser.data)
        return JsonResponse(response)


# 24-6-16新增功能，接收deviceid，推入mq
class PutDeviceIdToMqView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def get(self, request, device_id):
        has_unit = Unit.objects.filter(deviceId=device_id).exists()
        if not has_unit:
            response = return_response(status=False, error=f'未找到{device_id}的设备')
        else:
            timer = datetime.datetime.now().replace(tzinfo=datetime.datetime.now().astimezone().tzinfo).strftime("%Y-%m-%dT%H:%M:%S%z")
            timer = f'{timer[:-2]}:{timer[-2:]}'
            start(message=json.dumps({
                "device_id": device_id,
                "time": timer
            }), device_id=device_id, queue_name='latest_online_device_queue', connect=False)
            response = return_response(info='ok')
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
