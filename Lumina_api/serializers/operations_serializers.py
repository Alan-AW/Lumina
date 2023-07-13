import json

from django.conf import settings as sys
from rest_framework import serializers
from operations.models import Company, Room, Zone, Unit, Temperature, Lighting, AndroidSettings
from users.models import Roles
from utils.methods import computed_sowing_time


class ZoneSer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=64)
    # company = serializers.SlugRelatedField(slug_field='id', queryset=Company, write_only=True)
    # company_name = serializers.CharField(read_only=True, source='company.name')
    status = serializers.IntegerField()
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    time_zone = serializers.CharField(max_length=32)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Zone
        exclude = ['company']
        # fields = '__all__'


# 登陆的zone返回序列化
class LoginZoneDataSer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ['id', 'name', 'time_zone']


class RoomSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(max_length=512)
    zone = serializers.SlugRelatedField(slug_field='id', queryset=Zone.objects)
    zone_name = serializers.CharField(source='zone.name', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Room
        fields = '__all__'


class UnitSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(max_length=512)
    room = serializers.SlugRelatedField(slug_field='id', queryset=Room.objects)
    room_number = serializers.CharField(source='room.serial_number', read_only=True)
    status = serializers.IntegerField()
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Unit
        fields = '__all__'


# 双端选择区域
class ChoicesZoneSer(serializers.ModelSerializer):
    label = serializers.CharField(source='name', read_only=True)
    value = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Zone
        fields = ['id', 'name', 'time_zone', 'label', 'value']


# web端选择房间
class ChoicesRoomSer(serializers.ModelSerializer):
    label = serializers.CharField(source='serial_number', read_only=True)
    value = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Room
        fields = ['label', 'value']


# web端选择机器
class ChoicesUnitSer(serializers.ModelSerializer):
    label = serializers.CharField(source='serial_number', read_only=True)
    value = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Unit
        fields = ['label', 'value']


# web端选择角色
class ChoicesRoleSer(serializers.ModelSerializer):
    label = serializers.CharField(source='title', read_only=True)
    value = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Roles
        fields = ['label', 'value']


# 第一期为安卓APP统一返回区域内的所有数据-已弃用
class RoomDeepSer(serializers.ModelSerializer):
    units = UnitSer(many=True)

    class Meta:
        model = Unit
        fields = ['id', 'serial_number', 'units']


# 第二期单独为安卓端返回房间详情信息
class RoomDescSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(max_length=512, read_only=True)
    max_current = serializers.SerializerMethodField()
    min_current = serializers.SerializerMethodField()

    def get_max_current(self, row):
        return {"title": "maxCurrent", "value": "25℃"}

    def get_min_current(self, row):
        return {"title": "minCurrent", "value": "20℃"}

    class Meta:
        model = Room
        fields = ['id', 'serial_number', 'max_current', 'min_current']


# 第二期安卓端登陆成功后，获取区域内所有房间的所有信息
def android_zones_deep_data(rooms):
    results = []
    for room in rooms:
        # 收集机器信息
        units = room.units.all()
        units_data = {unit.id: unit.serial_number for unit in units}
        units_names = list(units_data.values())
        units_ids = list(units_data.keys())
        # 收集机器下的作物信息
        crop_item_list = [
            [
                {
                    "cropItemDay": computed_sowing_time(plant_desc.create_time),
                    "cropItemCycle": plant_desc.cycle,
                    "cropItemName": plant_desc.plant.name_cn,
                    "url": f'{sys.API_BASE_URL}{plant_desc.plant.icon_path.file.url}'
                } for plant_desc in unit.plant_desc.all() if
                plant_desc.cycle > computed_sowing_time(plant_desc.create_time)
            ]
            for unit in units
        ]
        item = {
            "recyclerData": RoomDescSer(room, many=False).data,
            "unitsNames": units_names,
            "unitsIDds": units_ids,
            "cropItemList": crop_item_list
        }
        results.append(item)
    return results


# 温度传感器序列化
class TemperatureSer(serializers.ModelSerializer):
    moment = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    json_val = serializers.SerializerMethodField()

    def get_json_val(self, row):
        val = [row.json_val[i:i + 8] for i in range(0, len(row.json_val), 8)]
        return val

    class Meta:
        model = Temperature
        fields = '__all__'


# 光照传感器序列化
class LightingSer(serializers.ModelSerializer):
    moment = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    json_val = serializers.JSONField(read_only=True)

    class Meta:
        model = Lighting
        fields = '__all__'


# 设置序列化
class AndroidSettingsSer(serializers.ModelSerializer):
    class Meta:
        model = AndroidSettings
        fields = '__all__'
