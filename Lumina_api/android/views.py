import datetime
import json

from django.db.transaction import atomic
from rest_framework.views import APIView
from django.http import JsonResponse
from android.models import AppOtaModel
from device.models import MessageQueueModel
from device.rabbit_mq.producer import start
from operations.models import Unit, Temperature, Lighting, UnitSetting, UnitSettingsList, Cultivar, UnitPlantDesc
from serializers.android_serializers import SendMessageToQueueSer, CultivarCnChoicesSer, CultivarEnChoicesSer, \
    algorithm_choices_inal_ser, ValidateUnitCultivarAlgorithmToMqSer, ValidateUnitAlgorithm
from serializers.operations_serializers import android_home_data, TemperatureSer, LightingSer
from utils.methods import return_response, get_temperature_dict, get_temperature_days_list, \
    get_max_center_min_temperature, is_within_date_range
from utils.create_log import create_logs
from utils.permissions.user_permission import ExcludeSuperPermission
from utils.test_datas import a


# 安卓端请求本公司所有房间内的所有数据--调整完毕(2024-1-13)
class CompanyRoomDeepDataView(APIView):
    permission_classes = [ExcludeSuperPermission]

    def get(self, request):
        language = request.query_params.get('language')
        queryset = request.user.company.rooms.all()
        data = android_home_data(queryset, en=language == 'en')
        response = return_response(data=data)
        return JsonResponse(response)


# 安卓端请求机器详情数据1
class UnitDescView(APIView):
    permission_classes = [ExcludeSuperPermission]

    """
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
    """

    # 24-4-18逻辑修改为返回4个折线图的数据，数据源从设备推送过来的数据中查询即可
    def get(self, request, unit_id):
        unit_obj = Unit.objects.filter(id=unit_id).first()
        if not unit_obj:
            response = return_response(status=False, error='设备ID错误！')
            return JsonResponse(response)
        device_id = unit_obj.deviceId
        # 查询出当前设备有效的种植记录
        plan_desc = UnitPlantDesc.objects.filter(status=True, unit_id=unit_id).order_by('-id').first()
        data = {
            'temperature_humidity': [],
            'fertigation': [],
            'vpd': [],
            'lighting': []
        }
        response = return_response(data=data)
        # 如果有种植周期
        if plan_desc:
            # 读取作物的周期时长
            cycle = plan_desc.cultivar.cycle
            # 计算作物是否还在种植周期内，如果在周期内，那么获取传感器推送的倒序前20条数据
            create_time = plan_desc.create_time.strftime("%Y-%m-%d %H:%M:%S")
            # 如果在有效的种植周期内
            if is_within_date_range(create_time, cycle):
                try:
                    # 读取传感器发过来的数据前20条
                    queryset = MessageQueueModel.objects.filter(device_id=device_id).order_by('-id')[:21]
                    # 整理出需要的数据
                    used_data = {
                        'vpd': [[]],
                        'temperature_humidity': {
                            'temperature': [],
                            'humidity': []
                        },
                        'lighting': {
                            'spectra_450_led': [],
                            'spectra_660_led': [],
                            'spectra_main_led': []
                        },
                        'fertigation': {
                            'current_ec': [],
                            'current_ph': []
                        }
                    }
                    for idx, i in enumerate(a):
                        # 真实数据：Queryset
                        # data_dict = i.content.get('data').get('data').get('data')
                        # 测试数据
                        data_dict = i.get('data').get('data').get('data')
                        thc = data_dict.get('thc')
                        thc_x = thc.get('last_updated')[11:19]
                        # vpd
                        vpd = thc.get('vpd')
                        used_data['vpd'][0].append({'key': thc_x, 'value': vpd})
                        # 温度和湿度
                        temperature = thc.get('temperature')
                        humidity = thc.get('humidity')
                        used_data['temperature_humidity']['temperature'].append({'key': thc_x, 'value': temperature})
                        used_data['temperature_humidity']['humidity'].append({'key': thc_x, 'value': humidity})
                        # 光照
                        lighting = data_dict.get('lighting')
                        spectra_450_led = lighting.get('spectra_450_led')
                        spectra_660_led = lighting.get('spectra_660_led')
                        spectra_main_led = lighting.get('spectra_main_led')
                        lighting_x = lighting.get('last_saved')[11:19]
                        used_data['lighting']['spectra_450_led'].append({'key': lighting_x, 'value': spectra_450_led})
                        used_data['lighting']['spectra_660_led'].append({'key': lighting_x, 'value': spectra_660_led})
                        used_data['lighting']['spectra_main_led'].append({'key': lighting_x, 'value': spectra_main_led})
                        # 水肥
                        fertigation = data_dict.get('fertigation')
                        current_ec = fertigation.get('current_ec')
                        current_ph = fertigation.get('current_ph')
                        fertigation_x = fertigation.get('current_last_updated')[11:19]
                        used_data['fertigation']['current_ec'].append({'key': fertigation_x, 'value': current_ec})
                        used_data['fertigation']['current_ph'].append({'key': fertigation_x, 'value': current_ph})

                    # 生成Echarts图表数据
                    for index, key in enumerate(used_data.keys()):
                        # 如果是字典
                        if isinstance(used_data[key], dict):
                            # 读取字典的key列表
                            keys = list(used_data[key].keys())
                            # 循环这个列表，将key对应的列表提出即可
                            used_data[key] = [used_data[key][k] for k in keys]
                    # 将data修改为处理后的data值
                    data = used_data
                    response = return_response(data=data)
                except Exception as e:
                    response = return_response(status=False, error='传感器数据错误！')
        return JsonResponse(response)


# 安卓端请求机器图表数据-此接口第二期做（正式版）
class UnitChartView(APIView):
    permission_classes = [ExcludeSuperPermission]

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


# 安卓端设备功能值参数读取-支持国际化-2023.1.13完成
class AndroidSettingsView(APIView):
    permission_classes = [ExcludeSuperPermission]

    # authentication_classes = []
    # permission_classes = []
    # throttle_classes = []

    def get(self, request, unit_id):
        unit_obj = Unit.objects.filter(pk=unit_id).first()
        if not unit_obj:
            response = return_response(status=False, error=f'未找到ID为：“{unit_id}”的设备！')
            return JsonResponse(response)
        unit_id = unit_obj.pk
        # ####### 24-4-19逻辑变更为直接从数据库读取即可，原逻辑直接删除 #######
        queryset = UnitSetting.objects.filter(unit=unit_obj).all().values('cmd__cmd', 'value')
        language = request.query_params.get('language')
        # unit_device_id = unit_obj.deviceId
        # default_value = [
        #     {'cmd': 'looper_motor', 'value': '2'},
        #     {'cmd': 'spectra', 'value': ''},
        #     {'cmd': 'spectra_main_led', 'value': '1000'},
        #     {'cmd': 'spectra_450_led', 'value': '200'},
        #     {'cmd': 'spectra_660_led', 'value': '200'}
        # ]
        result = {}
        # 不管数据库有没有数据，都直接更新一下 value 值
        for index, item in enumerate(queryset):
            # 搜索当前设备的当前设置的值
            unit_set_obj = UnitSetting.objects.filter(unit_id=unit_id, cmd__cmd=item['cmd__cmd']).first()
            # 有记录：修改 value 值
            if unit_set_obj:
                unit_set_obj.value = item['value']
                unit_set_obj.save()
            else:
                # 没有记录：创建记录，auto 默认为 true
                unit_set_obj = UnitSetting.objects.create(
                    unit_id=unit_id,
                    cmd_id=UnitSettingsList.objects.get(cmd=item['cmd__cmd']).pk,
                    value=item['value'],
                    auto=True
                )
            # 修改原数据，准备返回数据
            cmd_obj = UnitSettingsList.objects.filter(cmd=item['cmd__cmd']).first()
            desc = language == 'en' and cmd_obj.desc_en or cmd_obj.desc_cn
            unit = language == 'en' and cmd_obj.unit_en or cmd_obj.unit_cn
            category = language == 'en' and cmd_obj.get_category_en_display() or cmd_obj.get_category_cn_display()
            result_item = {
                **item,
                'auto': unit_set_obj.auto,
                'desc': desc,
                'component': cmd_obj.get_component_display(),
                'min_value': cmd_obj.min_value,
                'max_value': cmd_obj.max_value,
                'step': cmd_obj.step,
                'unit': unit
            }
            if category not in result.keys():
                result[category] = []
                result[category].append(result_item)
            else:
                result[category].append(result_item)
        response = return_response(data=result)
        return JsonResponse(response)


# 安卓端修改设备功能配置项入库并推到mq动态队列
# 安卓端admin修改设备配置项入库并推上mq动态队列
class SendCmdToMQView(APIView):
    permission_classes = [ExcludeSuperPermission]

    # authentication_classes = []
    # permission_classes = []
    # throttle_classes = []
    # ID_execution_command_queue type 从 instruction_set 改成 manual_command 就行了

    def post(self, request, unit_id):
        # 只发送修改部分的内容即可，未修改的不推送，也不发过来
        # 接收方需要约定好数据格式，不管一条配置还是多条配置，都是一个列表上队列
        # 前端传递数据的格式为：[{cmd: 'temperature', value: '23', auto: 0 or 1}, ......]
        # ################ 24-4-18修改逻辑为大json格式推送 ################
        # ################ 队列名称：deviceId_execution_command_queue 将type改成 manual_command ################
        unit_obj = Unit.objects.filter(pk=unit_id).first()
        if not unit_obj:
            response = return_response(status=False, error=f'未找到“{unit_id}”的设备！')
            return JsonResponse(response)
        device_id = unit_obj.deviceId
        data = request.data
        if not isinstance(data, list):
            return return_response(status=False, error='数据格式错误！')
        try:
            with atomic():
                message_data = {}
                # 更新数据库中对应设备的记录值
                for item in data:
                    update_data = {'auto': item['auto'], 'value': item['value']}
                    UnitSetting.objects.filter(unit=unit_obj, cmd__cmd=item['cmd']).update(**update_data)
                    message_data[item['cmd']] = item['value']
                # 记录日志
                create_logs(request.user, UnitSetting, 5, data)
                # 推入队列
                message = {
                    "data": {
                        "deviceId": device_id,
                        "instruction_set": {
                            "data": {
                                "type": "manual_command",
                                "device_id": device_id,
                                "instructions": [
                                    {
                                        "phase": "transplant_recovery",
                                        "actions": [
                                            {
                                                "type": "action",
                                                "hardware": "lighting",
                                                "spectra_main_led": message_data.get('spectra_main_led'),
                                                "spectra_450_led": message_data.get('spectra_450_led'),
                                                "spectra_660_led": message_data.get('spectra_660_led')
                                            },
                                            {
                                                "type": "action",
                                                "hardware": "motor",
                                                "motor": message_data.get('looper_motor')
                                            }
                                        ]
                                    }
                                ]
                            },
                            "device_id": device_id
                        }
                    },
                    "deviceId": device_id
                }
                start(message=json.dumps(message), device_id=unit_obj.deviceId, queue_name='execution_command_queue')
                response = return_response(info='设置成功!')
        except Exception as e:
            response = return_response(status=False, error=str(e))
        return JsonResponse(response)


# 安卓端为设备添加品类,选择品类API
class CultivarChoicesView(APIView):
    permission_classes = [ExcludeSuperPermission]

    def get(self, request):
        query_params = request.query_params.get('language')
        if query_params == 'en':
            ser = CultivarEnChoicesSer
        else:
            ser = CultivarCnChoicesSer
        # 可选品类控制，只能选择当前公司拥有的种植品类
        allow_cultivars_list = [item.id for item in request.user.company.allow_cultivars.all()]
        queryset = Cultivar.objects.filter(id__in=allow_cultivars_list).all()
        data = ser(queryset, many=True).data
        response = return_response(data=data)
        return JsonResponse(response)


# 安卓端选择了品类之后，返回该品类的算法供用户选择
class CultivarAlgorithmChoicesView(APIView):
    permission_classes = [ExcludeSuperPermission]

    def get(self, request, cultivar_id):
        language = request.query_params.get('language')
        cultivar_obj = Cultivar.objects.filter(pk=cultivar_id).first()
        if not cultivar_obj:
            response = return_response(status=False, error=f'未找到“{cultivar_id}”的品类！')
            return JsonResponse(response)
        # 搜索出该品类的所有算法
        queryset = cultivar_obj.algorithm.all()
        data = algorithm_choices_inal_ser(queryset, language=language)
        response = return_response(data=data)
        return JsonResponse(response)


# 安卓端选择了算法之后将数据提交到服务器进行处理和推送
class SendAlgorithmToMQView(APIView):
    # permission_classes = [ExcludeSuperPermission]
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def post(self, request):
        # 测试数据id：unit = 5, cultivar=1, algorithm = [10, 11]
        language = request.query_params.get('language')
        en = language == 'en'
        #  读取数据
        ser = ValidateUnitCultivarAlgorithmToMqSer(data=request.data)
        if ser.is_valid():
            # 数据验证通过提取数据
            data = ser.validated_data
            device_id = data.get('device_id')
            unit = data.get('unit')
            cultivar = data.get('cultivar')
            algorithm = data.get('algorithm')
            # 添加设备的种植内容
            new_record_obj = UnitPlantDesc.objects.create(
                unit=unit, cultivar=cultivar
            )
            # 将生成的种植记录ID放入算法中，供后续查询算法使用
            algorithm['grow_cycle_id'] = new_record_obj.id
            algorithm['data']['grow_cycle_id'] = new_record_obj.id
            # 更新记录值
            new_record_obj.algorithm = algorithm
            new_record_obj.save()
            # 将算法数据推上mq队列
            start(message=json.dumps(algorithm), device_id=device_id, queue_name='execution_command_queue')
            # 返回提示信息
            info = 'The data was saved successfully!' if en else '数据保存成功！'
            response = return_response(info=info)
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)


# 安卓端更新设备算法接口
class UpdateUnitInfoView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def post(self, request):
        ser = ValidateUnitAlgorithm(data=request.data)
        if ser.is_valid():
            data = ser.validated_data
            device_id = data.get('device_id')
            algorithm = request.data.get('algorithm')
            record = data.get('record')
            record.algorithm = algorithm
            record.save()
            start(message=json.dumps(algorithm), device_id=device_id, queue_name='execution_command_queue')
            response = return_response(info='数据更新成功！')
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)


# 安卓端APP的OTA升级
class AppOtaApkView(APIView):
    permission_classes = [ExcludeSuperPermission]

    def get(self, request):
        queryset = AppOtaModel.objects.first()
        data = {'version': queryset.version, 'apk': queryset.apk.url, 'size': queryset.apk.size} if queryset else {}
        response = return_response(data=data)
        return JsonResponse(response)
