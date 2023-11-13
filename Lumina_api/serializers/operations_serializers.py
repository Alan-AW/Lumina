import json

from django.conf import settings as sys
from rest_framework import serializers
from operations.models import Company, Room, Zone, Unit, Temperature, Lighting, AndroidSettings, Species, \
    Cultivars, Models, Phases, Instruction, Action, Triggers
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
        return "25℃"

    def get_min_current(self, row):
        return "20℃"

    class Meta:
        model = Room
        fields = ['id', 'serial_number', 'max_current', 'min_current']


# 第二期安卓端登陆成功后，获取区域内所有房间的所有信息-已废弃

def android_zones_deep_data(rooms):
    results = []
    for room in rooms:
        # 收集机器信息
        units = room.units.all()
        units_data = {unit.id: unit.serial_number for unit in units}
        units_names = list(units_data.values())
        units_ids = list(units_data.keys())
        # 收集机器下的作物信息
        crop_item_list = []
        for unit in units:
            for plant_desc in unit.plant_desc.all():
                if plant_desc.cycle > computed_sowing_time(plant_desc.create_time):
                    i = {
                        "cropItemDay": computed_sowing_time(plant_desc.create_time),
                        "cropItemCycle": plant_desc.cycle,
                        "cropItemName": plant_desc.plant.name_cn,
                        "url": f'{sys.API_BASE_URL}{plant_desc.plant.icon_path.file.url}'
                    }
                    crop_item_list.append(i)
        item = {
            "recyclerData": RoomDescSer(room, many=False).data,
            "unitsNames": units_names,
            "unitsIDds": units_ids,
            "cropItemList": crop_item_list
        }
        results.append(item)
    return results


# 第三期正式版，安卓首页接口，与上面一样
def unitsDescSer(units):
    data_list = []
    for unit in units:
        for plant_desc in unit.plant_desc.all():
            if plant_desc.cycle > computed_sowing_time(plant_desc.create_time):
                data_list.append({
                    "id": unit.id,
                    "serial_number": unit.serial_number,
                    "cropItemDay": computed_sowing_time(plant_desc.create_time),
                    "cropItemCycle": plant_desc.cycle,
                    "cropItemName": plant_desc.plant.name_cn,
                    "url": f'{sys.API_BASE_URL}{plant_desc.plant.icon_path.file.url}'
                })
    return data_list


# 第三期正式版，安卓首页接口主序列化程序
def android_home_data(rooms):
    # 遍历每一个房间
    data_list = []
    for room in rooms:
        # 为每一个房间生成一个详情数据
        data_list.append({
            "room_desc": RoomDescSer(room, many=False).data,
            "units_desc_list": unitsDescSer(room.units.all())
        })
    return data_list


# 温度传感器序列化
class TemperatureSer(serializers.ModelSerializer):
    moment = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    data_list = serializers.SerializerMethodField()

    def get_data_list(self, row):
        val = [row.json_val[i:i + 8] for i in range(0, len(row.json_val), 8)]
        return val

    class Meta:
        model = Temperature
        exclude = ['json_val']


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


# 数据结构导出序列化程序
class TriggersSer(serializers.ModelSerializer):
    class Meta:
        model = Triggers
        fields = '__all__'


class ActionSer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = '__all__'


class InstructionSer(serializers.ModelSerializer):
    action = serializers.SerializerMethodField()

    def get_action(self, row):
        queryset = row.action.all()
        ser = ActionSer(queryset, many=True)
        return ser.data

    class Meta:
        model = Instruction
        fields = '__all__'


class PhasesSer(serializers.ModelSerializer):
    base = serializers.SerializerMethodField()
    triggers = serializers.SerializerMethodField()

    def get_base(self, row):
        queryset = row.base.all()
        ser = InstructionSer(queryset, many=True)
        return ser.data

    def get_triggers(self, row):
        queryset = row.triggers.all()
        ser = TriggersSer(queryset, many=True)
        return ser.data

    class Meta:
        model = Phases
        fields = '__all__'


class ModelsSer(serializers.ModelSerializer):
    phases = serializers.SerializerMethodField()

    def get_phases(self, row):
        queryset = row.phases.all()
        ser = PhasesSer(queryset, many=True)
        return ser.data

    class Meta:
        model = Models
        fields = '__all__'


class CultivarsSer(serializers.ModelSerializer):
    models = serializers.SerializerMethodField()

    def get_models(self, row):
        queryset = row.models.all()
        ser = ModelsSer(queryset, many=True)
        return ser.data

    class Meta:
        model = Cultivars
        fields = '__all__'


class ExportDataSer(serializers.ModelSerializer):
    cultivars = serializers.SerializerMethodField()

    def get_cultivars(self, row):
        queryset = row.cultivars.all()
        ser = CultivarsSer(queryset, many=True)
        return ser.data

    class Meta:
        model = Species
        fields = '__all__'
