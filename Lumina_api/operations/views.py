import datetime
from rest_framework.views import APIView
from django.http import JsonResponse
from operations.models import Room, Zone, Unit, Temperature, Fertilizer, RoomDesc, Lighting
from serializers.operations_serializers import RoomSer, ZoneSer, UnitSer, ChoicesZoneSer, ChoicesRoomSer, \
    android_zones_deep_data, ChoicesRoleSer, TemperatureSer, LightingSer, AndroidSettingsSer
from users.models import Roles
from utils.methods import return_response, get_data, get_temperature_dict, \
    get_temperature_days_list, get_max_center_min_temperature


# 区域管理
class ZoneView(APIView):
    def get(self, request):
        queryset = request.user.company.zones.all()
        data = get_data(queryset, True, request, self, ZoneSer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request, row_id=None):
        ser = ZoneSer(data=request.data)
        if ser.is_valid():
            ser.save(**{'company': request.user.company})
            response = return_response(data=ser.data, info='区域添加成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, row_id=None):
        queryset = Zone.objects.get(id=row_id)
        ser = ZoneSer(instance=queryset, data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(data=ser.data, info='区域信息修改成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, row_id=None):
        try:
            data = Zone.objects.filter(id=row_id).delete()
            response = return_response(data=int(row_id), info=f'成功删除{data}条数据！')
        except Zone.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
        return JsonResponse(response)


# 房间管理
class RoomView(APIView):
    def get(self, request):
        queryset = Room.objects.filter(zone__company__account=request.user).all()
        data = get_data(queryset, True, request, self, RoomSer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request, row_id=None):
        ser = RoomSer(data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(data=ser.data, info='房间信息添加成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, row_id=None):
        queryset = Room.objects.get(id=row_id)
        ser = RoomSer(instance=queryset, data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(data=ser.data, info='房间信息更新成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, row_id=None):
        try:
            data = Room.objects.filter(id=row_id).delete()
            response = return_response(data=int(row_id), info=f'成功删除{data}条数据！')
        except Room.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
        return JsonResponse(response)


# 机器管理
class UnitView(APIView):
    def get(self, request):
        data = get_data(Unit, False, request, self, UnitSer)
        response = return_response(data=data)
        return JsonResponse(response)

    def post(self, request, row_id=None):
        ser = UnitSer(data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(data=ser.data, info='机器添加成功!')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def patch(self, request, row_id=None):
        queryset = Unit.objects.get(id=row_id)
        ser = UnitSer(instance=queryset, data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(data=ser.data, info='机器信息修改成功!')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)

    def delete(self, request, row_id):
        try:
            data = Unit.objects.filter(id=row_id).delete()
            response = return_response(data=row_id, info=f'已删除{data}条数据！')
        except Unit.DoesNotExist as e:
            response = return_response(status=False, error=f'{e}')
        return JsonResponse(response)


# 选择区域
class ChoicesZoneView(APIView):
    def get(self, request):
        # react web端
        return self.public_result(request)

    def post(self, request):
        # 安卓端
        return self.public_result(request)

    def public_result(self, request):
        queryset = request.user.company.zones.all()
        ser = ChoicesZoneSer(queryset, many=True)
        response = return_response(data=ser.data)
        return JsonResponse(response)


# 选择房间
class ChoicesRoomView(APIView):
    def get(self, request):
        return self.public_results(request)

    def post(self, request):
        return self.public_results(request)

    def public_results(self, request):
        queryset = Room.objects.filter(zone__company__account=request.user).all()
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


# 安卓端请求机器详情数据
class UnitDescView(APIView):
    def post(self, request):
        # 获取机器信息
        unit_id = request.data.get('unitId')
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
