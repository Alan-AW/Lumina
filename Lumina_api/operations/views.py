from rest_framework.views import APIView
from django.http import JsonResponse
from operations.models import Room, Zone, Unit, Temperature, Fertilizer, RoomDesc
from serializers.operations_serializers import RoomSer, ZoneSer, UnitSer, ChoicesZoneSer, ChoicesRoomSer, \
    android_zones_deep_data, ChoicesRoleSer
from users.models import Roles
from utils.methods import return_response, get_data


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
            'temperature': [Temperature, request.data.get('thermal_reading')],  # # 温度
            'fertilizer': [Fertilizer, request.data.get('fertilizer')],  # # 水肥
            'rooms': [RoomDesc, request.data.get('rooms')],  # 房间
        }
        operate_list = map_http_request_operate.get(types)
        if not operate_list:
            response = return_response(status=False, error='The request interface is incorrect！')
            return JsonResponse(response)
        model, val = operate_list
        model.objects.create(**val)
        response = return_response(info='The data is saved')
        return JsonResponse(response)


# 安卓端请求机器详情数据
class UnitDescView(APIView):
    def post(self, request):
        unit_id = request.data.get('unitId')
