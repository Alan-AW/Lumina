import datetime
from rest_framework.views import APIView
from django.http import JsonResponse
from operations.models import Unit, Temperature, Lighting
from serializers.operations_serializers import android_zones_deep_data, TemperatureSer, LightingSer, AndroidSettingsSer
from utils.methods import return_response, get_temperature_dict, get_temperature_days_list, \
    get_max_center_min_temperature


# 安卓端请求区域内的所有数据
class ZoneDeepDataView(APIView):
    def post(self, request):
        zone_id = request.data.get('zoneId')
        zone = request.user.company.zones.filter(id=zone_id).first()
        if not zone:
            response = return_response(status=False, error=f'未找到ID为{zone_id}的区域！')
            return JsonResponse(response)
        queryset = zone.rooms.all()
        data = android_zones_deep_data(queryset)
        response = return_response(data=data)
        return JsonResponse(response)


# 安卓端请求机器详情数据1
class UnitDescView(APIView):
    def get(self, request, unit_id):
        # 获取机器信息
        # unit_id = request.data.get('unitId')
        unit_obj = Unit.objects.filter(id=unit_id).first()
        if not unit_obj:
            response = return_response(status=False, error=f'未找到ID为{unit_id}的机器！')
            return JsonResponse(response)
        # 读取区域信息
        zone_name = unit_obj.room.zone.name
        zone_time_zone = unit_obj.room.zone.time_zone
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
        every_days_temperature = {
            "high": [item[0] for item in every_days_temperature],
            "middle": [item[1] for item in every_days_temperature],
            "low": [item[2] for item in every_days_temperature]
        }
        data = {
            'zone_name': zone_name,
            'serial_number': unit_obj.serial_number,
            'time_zone': zone_time_zone,
            'temperature': temperature_ser.data,
            'average': every_days_temperature,
            'unit_status': lighting_ser.data,
            'x_label': x_label
        }
        response = return_response(data=data)
        return JsonResponse(response)


# 安卓端参数设置
class AndroidSettingsView(APIView):
    def post(self, request):
        ser = AndroidSettingsSer(data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(info='数据保存成功!')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)
