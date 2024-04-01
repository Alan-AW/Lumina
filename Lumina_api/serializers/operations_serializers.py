from django.conf import settings as sys
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from device.rabbit_mq.consumer_status import get_all_data
from operations.models import Company, Room, Unit, Temperature, Lighting, UnitSetting, Species, \
    Cultivars, Models, Phases, Instruction, Action, Triggers, UnitSettingsList, Cultivar, Algorithm
from users.models import Roles
from utils.methods import computed_sowing_time


# 房间管理序列化
class RoomSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(max_length=512)
    company = serializers.SlugRelatedField(slug_field='id', queryset=Company.objects.all())
    company_name = serializers.CharField(source='company.name', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Room
        fields = '__all__'


# 设备管理序列化
class UnitSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(max_length=512, allow_null=True, allow_blank=True, required=False)
    deviceId = serializers.CharField(validators=[UniqueValidator(queryset=Unit.objects.all(), message='设备ID重复！')])
    deviceSecret = serializers.CharField()
    room = serializers.SlugRelatedField(slug_field='id', queryset=Room.objects)
    room_number = serializers.CharField(source='room.serial_number', read_only=True)
    status = serializers.IntegerField()
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Unit
        fields = '__all__'


# web端选择房间
class ChoicesRoomSer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()
    value = serializers.IntegerField(source='id', read_only=True)

    def get_label(self, row):
        return f'{row.company.name}-{row.serial_number}'

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


# 第二期单独为安卓端返回房间详情信息-使用中(2024-1-13)
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


# 第三期正式版，安卓首页接口数据序列化-使用中(2024-1-13)
# 接口调整支持国际化，且字段调整为去品类表中查询数据集-2024-2-5
def unitsDescSer(units, en=False):
    result = []
    # 循环房间内所有机器设备
    for unit in units:
        # 循环每台设备中种植的作物详情信息（有多少作物）
        data_list = unit.plant_desc.all().values(
            'id', 'cultivar__icon', 'cultivar__cycle', 'cultivar__name_cn', 'cultivar__name_en', 'create_time'
        )
        for plant_desc in data_list:
            # 如果当前作物在种植周期内
            if plant_desc['cultivar__cycle'] > computed_sowing_time(plant_desc['create_time']):
                # 收集数据
                item = {
                    "id": unit.id,  # 设备唯一id
                    "device_id": unit.deviceId,
                    "serial_number": unit.serial_number,  # 设备名称
                    "cropItemDay": computed_sowing_time(plant_desc['create_time']),  # 已种植时间
                    "cropItemCycle": plant_desc['cultivar__cycle'],  # 作物周期
                    "cropItemName": plant_desc['cultivar__name_en'] if en else plant_desc['cultivar__name_cn'],  # 作物名称
                    "url": plant_desc['cultivar__icon']  # 作物图片
                }
                result.append(item)
    return result


# 第三期正式版，安卓首页接口主序列化程序-使用中(2024-1-13)
def android_home_data(rooms, en=False):
    # 遍历每一个房间
    data_list = []
    for room in rooms:
        # 为每一个房间生成一个详情数据
        data_list.append({
            "room_desc": RoomDescSer(room, many=False).data,
            "units_desc_list": unitsDescSer(room.units.all(), en)
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


# 公司管理序列化
class CompanySer(serializers.ModelSerializer):
    address = serializers.CharField(allow_null=True, allow_blank=True)
    legal_rep = serializers.CharField(allow_null=True, allow_blank=True)
    tel = serializers.CharField(allow_null=True, allow_blank=True)
    email = serializers.CharField(allow_null=True, allow_blank=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Company
        fields = '__all__'


# 设备支持功能列表序列化
class UnitSettingsListSer(serializers.ModelSerializer):
    component_name = serializers.CharField(source='get_component_display', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = UnitSettingsList
        fields = '__all__'


# 品类管理序列化
class CultivarSer(serializers.ModelSerializer):
    class Meta:
        model = Cultivar
        fields = '__all__'
        extra_kwargs = {
            'algorithm': {'read_only': True},
        }


# 算法管理序列化
class AlgorithmSer(serializers.ModelSerializer):
    class Meta:
        model = Algorithm
        fields = '__all__'


# 设备设置项序列化
class UnitSettingSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(source='unit.serial_number', read_only=True)
    deviceId = serializers.CharField(source='unit.deviceId', read_only=True)
    cmd_name = serializers.CharField(source='cmd.cmd', read_only=True)

    class Meta:
        model = UnitSetting
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
