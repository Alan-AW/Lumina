import uuid
import datetime

import pytz
from rest_framework import serializers
from collections import defaultdict
from android.models import SendMessageToQueue
from operations.models import Cultivar, Algorithm, Unit, UnitPlantDesc, CompanyCultivarAlgorithm
from utils.methods import is_within_date_range


class SendMessageToQueueSer(serializers.ModelSerializer):
    class Meta:
        model = SendMessageToQueue
        exclude = ['create_time', 'update_time']


# 安卓端选择设备下的品类国际化序列化
class CultivarCnChoicesSer(serializers.ModelSerializer):
    label = serializers.CharField(source='name_cn')
    value = serializers.IntegerField(source='id')

    class Meta:
        model = Cultivar
        fields = ['label', 'value', 'icon']


class CultivarEnChoicesSer(serializers.ModelSerializer):
    label = serializers.CharField(source='name_en')
    value = serializers.IntegerField(source='id')

    class Meta:
        model = Cultivar
        fields = ['label', 'value', 'icon']


# 安卓端选择了品类之后，返回该品类的算法,支持国际化
def algorithm_choices_inal_ser(queryset, language):
    # subject, title, desc, choices, cmd
    serialized_data = []
    subject_dict = defaultdict(list)
    en = language == 'en'

    data_list = queryset.filter(app_show=True).order_by('id').values(
        'id', 'subject_cn', 'subject_en', 'title_cn', 'title_en',
        'choices_cn', 'choices_en', 'desc_cn', 'desc_en', 'choices_self'
    )

    for algorithm in data_list:
        subject = algorithm['subject_en'] if en else algorithm['subject_cn']
        subject_dict[subject].append(
            {
                'id': algorithm['id'],
                'title': algorithm['title_en'] if en else algorithm['title_cn'],
                'desc': algorithm['desc_en'] if en else algorithm['desc_cn'],
                'choices': [
                    {'label': choice, 'value': index} for index, choice in enumerate(algorithm['choices_en'])
                ] if en else [
                    {'label': choice, 'value': index} for index, choice in enumerate(algorithm['choices_cn'])
                ],
                'choices_self': algorithm['choices_self']
            }
        )

    for subject, children in subject_dict.items():
        serialized_data.append(
            {
                'subject': subject,
                'choices_self': children[0].pop('choices_self'),
                'child': children
            }
        )

    return serialized_data


# 安卓端选择了品类对应的算法之后将数据保存并推送到mq队列
class ValidateUnitCultivarAlgorithmToMqSer(serializers.Serializer):
    unit = serializers.SlugRelatedField(required=True, slug_field='id', queryset=Unit.objects.all())
    cultivar = serializers.SlugRelatedField(required=True, slug_field='id', queryset=Cultivar.objects.all())
    algorithm = serializers.JSONField(required=True, error_messages={'invalid': '算法格式错误！', 'required': '算法必须选择！'})
    tod = serializers.CharField(required=True, error_messages={'required': 'tod必选择！'})

    def validate(self, attrs):
        # 获取要种植的设备对象
        unit = attrs.get('unit')
        cultivar = attrs.get('cultivar')
        tod = attrs.get('tod')
        # 查询设备是否还存在种植周期
        cycle_record = UnitPlantDesc.objects.filter(unit=unit, status=True).first()
        # 如果存在种植周期
        if cycle_record:
            # 读取种植周期时长
            # cycle = cycle_record.cultivar.cycle
            # 读取种植日期
            # create_time = cycle_record.create_time.strftime("%Y-%m-%d %H:%M:%S")
            # 计算当前种植周期是否结束
            # is_in_range = is_within_date_range(create_time, cycle)
            # 已结束->继续
            # 否则->不允许种植品类
            # if is_in_range:
            #     raise serializers.ValidationError('当前种植周期未结束！')

            # 24-4-18逻辑修改为，结束当前生效的种植周期，添加新的种植周期
            cycle_record.status = False
            cycle_record.save()
        attrs['device_id'] = attrs.get('unit').deviceId
        algorithm = attrs.get('algorithm')
        for item in algorithm:
            del item['choices_self']
        # algorithm目标格式,
        # a = [
        #     {"choices_self": True, "id": 8, "value": 1},
        #     {"choices_self": True, "id": 8, "value": 1},
        #     {"choices_self": True, "id": 8, "value": 1},
        #     {"choices_self": True, "id": 8, "value": 1},
        #     {"choices_self": True, "id": 8, "value": 1},
        #     {"choices_self": True, "id": 8, "value": 1},
        # ]
        # algorithm序列化之后的格式，也就是要推向mq队列的数据直接拼接好进行返回
        """
        2024-3-28确定推送数据格式和内容，但是APP端选择的value值和是否默认推送的内容
        不在此次修改之内，逻辑核心目前只能识别此次推送的数据，其余逻辑待后续完善。
        """
        algorithm_body = self.create_algorithm_body(cultivar, attrs['device_id'], algorithm, tod)
        attrs['algorithm'] = algorithm_body
        return attrs

    def create_uuid(self):
        unique_str = str(uuid.uuid4()).replace('-', '')[:12]
        return unique_str

    def create_algorithm_body(self, cultivar, device_id, algorithm, tod):
        # grow_cycle_id = self.create_uuid()
        now = datetime.datetime.now(pytz.timezone('Asia/Shanghai'))
        custom_format = now.strftime('%Y-%m-%dT%H:%M:%S%z')
        time = custom_format[:-2] + ':' + custom_format[-2:]
        # tod = now.strftime('%Y-%m-%d %H:%M:%S').split(' ')[1]
        data = {
            'device_id': device_id,
            'time': time,
            'grow_cycle_id': None,
            'version': '0.5A.0',
            'data': {
                "type": "instruction_set",
                "device_id": device_id,
                'time': time,
                'grow_cycle_id': None,
                'version': '0.5A.0',
                'tod': tod,
                'instructions': self.get_instructions(cultivar, device_id, algorithm)
            }
        }
        return data

    def get_instructions(self, cultivar, device_id, algorithm):
        unit = Unit.objects.filter(deviceId=device_id).first()
        room = unit.room
        company = room.company
        data = []
        for item in algorithm:
            has_record = CompanyCultivarAlgorithm.objects.filter(
                cultivar=cultivar, company=company, algorithm_id=item['id']
            ).first()
            if has_record:
                cmd = has_record.cmd
            else:
                algorithm_obj = Algorithm.objects.filter(id=item['id']).first()
                cmd = algorithm_obj.cmd
            data.append(cmd)
        return data


# 安卓端更新种植记录算法json数据
class ValidateUnitAlgorithm(serializers.Serializer):
    unit_device_id = serializers.SlugRelatedField(
        required=True, slug_field='deviceId', queryset=Unit.objects.all(),
        error_messages={'required': 'deviceId参数缺失!'}
    )
    algorithm = serializers.JSONField(
        required=True, error_messages={'required': 'algorithm参数缺失!'}
    )

    def validate(self, attrs):
        unit_obj = attrs.get('unit_device_id')
        attrs['device_id'] = unit_obj.deviceId
        record = UnitPlantDesc.objects.filter(unit=unit_obj).order_by('-id').first()
        if not record:
            raise serializers.ValidationError('该设备无种植周期记录！')
        else:
            attrs['record'] = record
        return attrs
