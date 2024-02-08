from rest_framework import serializers
from collections import defaultdict
from android.models import SendMessageToQueue
from operations.models import Cultivar, Algorithm, Unit


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
        subject_dict[subject].append({
            'id': algorithm['id'],
            'title': algorithm['title_en'] if en else algorithm['title_cn'],
            'desc': algorithm['desc_en'] if en else algorithm['desc_cn'],
            'choices': [
                {'label': choice, 'value': index} for index, choice in enumerate(algorithm['choices_en'])
            ] if en else [
                {'label': choice, 'value': index} for index, choice in enumerate(algorithm['choices_cn'])
            ],
            'choices_self': algorithm['choices_self']
        })

    for subject, children in subject_dict.items():
        serialized_data.append({
            'subject': subject,
            'choices_self': children[0].pop('choices_self'),
            'child': children
        })

    return serialized_data


# 安卓端选择了品类对应的算法之后将数据保存并推送到mq队列
class ValidateUnitCultivarAlgorithmToMqSer(serializers.Serializer):
    unit = serializers.SlugRelatedField(slug_field='id', queryset=Unit.objects.all())
    cultivar = serializers.SlugRelatedField(slug_field='id', queryset=Cultivar.objects.all())
    algorithm = serializers.JSONField(error_messages={'invalid': '算法格式错误！'})

    def validate(self, attrs):
        attrs['device_id'] = attrs.get('unit').deviceId
        algorithm = attrs.get('algorithm')
        # algorithm目标格式,
        a = [
            {"choices_self": True, "id": 8, "value": 1},
            {"choices_self": True, "id": 8, "value": 1},
            {"choices_self": True, "id": 8, "value": 1},
            {"choices_self": True, "id": 8, "value": 1},
            {"choices_self": True, "id": 8, "value": 1},
            {"choices_self": True, "id": 8, "value": 1},
        ]
        # algorithm序列化之后的格式，也就是要推向mq队列的数据直接拼接好进行返回
        attrs['algorithm'] = {
            "type": "",
            "data": {
                #  内容待定
            }
        }
        return attrs
