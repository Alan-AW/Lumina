import datetime
import json

from django.db.transaction import atomic
from rest_framework.views import APIView
from django.http import JsonResponse
from device.rabbit_mq.producer import start
from operations.models import Unit, Temperature, Lighting, UnitSetting, UnitSettingsList
from serializers.android_serializers import SendMessageToQueueSer
from serializers.operations_serializers import android_home_data, TemperatureSer, LightingSer, UnitSettingSer
from utils.methods import return_response, get_temperature_dict, get_temperature_days_list, \
    get_max_center_min_temperature
from utils.create_log import create_logs
from utils.permissions.user_permission import ExcludeSuperPermission


# 安卓端请求本公司所有房间内的所有数据--调整完毕(2024-1-13)
class ZoneDeepDataView(APIView):
    permission_classes = [ExcludeSuperPermission]

    def get(self, request):
        queryset = request.user.company.rooms.all()
        data = android_home_data(queryset)
        response = return_response(data=data)
        return JsonResponse(response)


# 安卓端请求机器详情数据1
class UnitDescView(APIView):
    permission_classes = [ExcludeSuperPermission]

    def get(self, request, unit_id):
        # 获取机器信息
        unit_obj = Unit.objects.filter(id=unit_id).first()
        if not unit_obj:
            response = return_response(status=False, error=f'未找到ID为{unit_id}的机器！')
            return JsonResponse(response)
        # 读取光照信息
        lighting_obj = Lighting.objects.filter(
            deviceId=unit_obj.deviceId, deviceSecret=unit_obj.deviceSecret
        ).last()
        lighting_ser = LightingSer(lighting_obj, many=False)
        # 读取该机器的最新一条温度信息
        temperature = Temperature.objects.filter(
            deviceId=unit_obj.deviceId, deviceSecret=unit_obj.deviceSecret
        ).last()
        temperature_ser = TemperatureSer(temperature, many=False)
        # 读取该机器种植的第一个作物的周期和种植时间
        plant = unit_obj.plant_desc.first()
        if not plant:
            return return_response(return_response(status=False, error='该机器暂未种植作物！'))
        cycle = plant.cycle
        # 种植日期
        sowing_time = plant.create_time
        # 周期最后一天日期
        cycle_target = sowing_time + datetime.timedelta(days=cycle)
        # 将开始日期和结束日期分别扩大一天
        start_time = sowing_time - datetime.timedelta(days=1)
        end_time = cycle_target + datetime.timedelta(days=1)
        # 按天为单位分组统计每一天的温度数据
        temperature_json_vals = Temperature.objects.filter(
            deviceId=unit_obj.deviceId, deviceSecret=unit_obj.deviceSecret,
            moment__range=(start_time, end_time)
        ).all().order_by('-id')
        # 得到每一天的分组温度字典数据
        temperature_dict = get_temperature_dict(temperature_json_vals)
        # 得到每一天的温度列表
        temperature_days_list = get_temperature_days_list(temperature_dict)
        # 生成x轴label
        x_label = [i[5:] for i in list(temperature_dict.keys())]
        # 求每个项的 高 中 低 温度比例 <=21 <= 22.5 <=25
        every_days_temperature = [get_max_center_min_temperature(i) for i in temperature_days_list]
        data = {
            'temperature': temperature_ser.data['data_list'],
            'unit_status': lighting_ser.data['json_val'],
            'echarts': {
                'value': every_days_temperature,
                'x_label': x_label
            }

        }
        response = return_response(data=data)
        return JsonResponse(response)


# 安卓端请求机器图表数据-此接口第二期做（正式版）
class UnitChartView(APIView):
    def get(self, request, unit_id):
        pass


# 接收json数据，数据入库并推上mq动态队列-此API非安卓端使用的，而是给客户调用的
class SendDataToMQView(APIView):
    # 测试阶段开放
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def post(self, request):
        data = request.data
        # 验证数据并入库
        ser = SendMessageToQueueSer(data=data)
        if ser.is_valid():
            ser.save()
            # 推送消息到动态队列
            device_id = data.get('device_id')
            data = data.get('data')
            start(message=json.dumps(data), device_id=device_id)
            response = return_response(info='数据保存成功!')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)


# 安卓端设备功能值参数读取-支持国际化
class AndroidSettingsView(APIView):
    # permission_classes = [ExcludeSuperPermission]
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def get(self, request, unit_id):
        unit_obj = Unit.objects.filter(pk=unit_id).first()
        if not unit_obj:
            response = return_response(status=False, error=f'未找到ID为：“{unit_id}”的设备！')
            return JsonResponse(response)
        unit_id = unit_obj.pk
        # 发起网络请求，查询当前设备id的所有值，此处为模拟发起请求,
        # 此处格式为携带设备serviceId发起查询请求，API直接返回给我的内容,
        # 查询的设备有多少功能，就给我返回多长的列表，
        # cmd表示功能指令，str
        # value表示值，str
        language = request.query_params.get('language')
        unit_device_id = unit_obj.deviceId
        default_value = [
            {'cmd': 'target_ec', 'value': '2.3'},
            {'cmd': 'target_ph', 'value': '4.5'},
            {'cmd': 'target_water_level', 'value': '40'},
            {'cmd': 'target_h2o2_concentration', 'value': '5'},
            {'cmd': 'reservoir_uv', 'value': '2'},
            {'cmd': 'day_night_cycle_hours', 'value': '20'},
        ]
        # 不管数据库有没有数据，都直接更新一下 value 值
        for index, item in enumerate(default_value):
            # 搜索当前设备的当前设置的值
            unit_set_obj = UnitSetting.objects.filter(unit_id=unit_id, cmd__cmd=item['cmd']).first()
            # 有记录：修改 value 值
            if unit_set_obj:
                unit_set_obj.value = item['value']
                unit_set_obj.save()
            else:
                # 没有记录：创建记录，auto 默认为 true
                unit_set_obj = UnitSetting.objects.create(
                    unit_id=unit_id,
                    cmd_id=UnitSettingsList.objects.get(cmd=item['cmd']).pk,
                    value=item['value'],
                    auto=True
                )
            # 修改原数据，准备返回数据
            cmd_obj = UnitSettingsList.objects.filter(cmd=item['cmd']).first()
            desc = language == 'en' and cmd_obj.desc_en or cmd_obj.desc_cn
            unit = language == 'en' and cmd_obj.unit_en or cmd_obj.unit_cn
            default_value[index] = {
                **item,
                'auto': unit_set_obj.auto,
                'desc': desc,
                'component': cmd_obj.get_component_display(),
                'min_value': cmd_obj.min_value,
                'max_value': cmd_obj.max_value,
                'step': cmd_obj.step,
                'unit': unit
            }
        response = return_response(data=default_value)
        return JsonResponse(response)


# 安卓端修改设备功能配置项入库并推到mq动态队列
class SendCmdToMQView(APIView):
    # permission_classes = [ExcludeSuperPermission]
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def post(self, request, unit_id):
        # 只发送修改部分的内容即可，未修改的不推送，也不发过来
        # 接收方需要约定好数据格式，不管一条配置还是多条配置，都是一个列表上队列
        # 前端传递数据的格式为：[{cmd: 'temperature', value: '23', auto: 0 or 1}, ......]
        unit_obj = Unit.objects.filter(pk=unit_id).first()
        if not unit_obj:
            response = return_response(status=False, error=f'未找到“{unit_id}”的设备！')
            return JsonResponse(response)
        data = request.data
        if not isinstance(data, list):
            return return_response(status=False, error='数据格式错误！')
        try:
            with atomic():
                # 更新数据库中对应设备的记录值
                for item in data:
                    update_data = {'auto': item['auto'], 'value': item['value']}
                    UnitSetting.objects.filter(unit=unit_obj, cmd__cmd=item['cmd']).update(**update_data)
                # 记录日志
                # create_logs(request, UnitSetting, 5, data)
                # 推入队列
                mq_data = list(map(lambda item: {**item, 'decideId': unit_obj.deviceId}, data))
                start(message=json.dumps(mq_data), device_id=unit_obj.deviceId, queue_name='manual_command_queue')
                response = return_response(info='设置成功!')
        except Exception as e:
            response = return_response(status=False, error=str(e))
        return JsonResponse(response)
