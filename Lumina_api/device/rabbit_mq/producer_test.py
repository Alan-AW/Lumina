"""
生产者
"""

import pika
import time
import json

"""
old:
HOST = '43.138.127.42'
PORT = 5372
USER = 'admin'
PASSWORD = '1ee2097c'
QUEUE_NAME = "device_data_queue"
"""


HOST = 'rabbitmq-serverless-cn-jmp3pov8d01.cn-shanghai.amqp-20.net.mq.amqp.aliyuncs.com'
PORT = 5372
USER = 'MjpyYWJiaXRtcS1zZXJ2ZXJsZXNzLWNuLWptcDNwb3Y4ZDAxOkxUQUk1dFNXc1pEdXA2N0JkM1QxSGN0Rw=='
PASSWORD = 'Mzc3NjZBNzZCODA1RjUxNjc2Njc4NzE5RDZGRjRGREZDQjZBNzk1NDoxNzE0MDU3OTU4Nzgy'
QUEUE_NAME = "device_data_queue"


def start(message, device_id=None):
    queue_name = QUEUE_NAME
    # 动态队列名称
    if device_id:
        queue_name = f'{device_id}_{QUEUE_NAME}'
    print('**' * 50)
    print(f'queue_name: {queue_name}')
    print('**' * 50)
    # 创建凭据对象
    credentials = pika.PlainCredentials(USER, PASSWORD)

    # 创建连接参数对象
    parameters = pika.ConnectionParameters(HOST, credentials=credentials)

    # 连接到RabbitMQ服务器
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    # 声明队列
    channel.queue_declare(
        queue=queue_name,
        # 消息队列向所有消费者发送消息
        durable=True,
        # arguments={'x-single-active-consumer': False}
    )

    # 发送消息
    channel.basic_publish(exchange='', routing_key=queue_name, body=str(message).encode())

    # 关闭连接
    connection.close()


if __name__ == '__main__':
    data = {
        "deviceId": "8RC4KBZ7",
        "version": "0.5A.0",
        "last_updated": "99999",
        "data": {
            "data": {
                "solar_irradiance": {
                    "solar_irradiance": 13,
                    "last_updated": "2024-04-24T20:52:47.617073"
                },
                "fertigation": {
                    "current_ec": 0.05,
                    "current_ph": 13.58,
                    "ec_alert_min": 0.5,
                    "ec_alert_max": 4.0,
                    "ph_alert_min": 4.0,
                    "ph_alert_max": 8.0,
                    "current_water_temp": 25.0,
                    "current_water_level": 0,
                    "current_last_updated": "2024-04-24T20:52:34.640717"
                },
                "thc": {
                    "main_upper": {
                        "position": "main_upper",
                        "temperature": 22.9,
                        "humidity": 44.3,
                        "co2": 418,
                        "vpd": 1.5554167997801533,
                        "last_updated": "2024-04-24T20:52:35.194897"
                    },
                    "main_lower": {
                        "position": "main_lower",
                        "temperature": 22.4,
                        "humidity": 48.9,
                        "co2": 400,
                        "vpd": 1.384341109065436,
                        "last_updated": "2024-04-24T20:52:35.733819"
                    }
                },
                "lighting": {
                    "spectra_main_led": 30,
                    "spectra_450_led": 30,
                    "spectra_660_led": 30,
                    "spectra_uva": False,
                    "spectra_uvb": False,
                    "spectra_uvc": False,
                    "spectra_450_laser": False,
                    "spectra_660_laser": False,
                    "plant_uv": False,
                    "last_saved": "2024-04-24T20:52:36.241278"
                }
            },
            "instruction_set": {
                "device_id": "8RC4KBZ7",
                "data": {
                    "tod": "12:55:40",
                    "time": "2024-03-30T16:32:40+08:00",
                    "type": "instruction_set",
                    "version": "0.5A.0",
                    "device_id": "8RC4KBZ7",
                    "instructions": [{
                        "phase": "transplant_recovery",
                        "actions": [{
                            "type": "action",
                            "hardware": "climate",
                            "vpd_priority_day": "temp",
                            "target_rh_max_day": 0.6,
                            "target_rh_min_day": 0.43,
                            "target_vpd_max_day": 0.7,
                            "target_vpd_min_day": 0.42,
                            "vpd_priority_night": "rh",
                            "target_rh_max_night": 0.57,
                            "target_rh_min_night": 0.46,
                            "target_vpd_max_night": 0.7,
                            "target_vpd_min_night": 0.42,
                            "target_amb_temp_max_day": 28,
                            "target_amb_temp_min_day": 16,
                            "target_amb_temp_max_night": 28,
                            "target_amb_temp_min_night": 16,
                            "target_rh_deadband_max_day": 0.6,
                            "target_rh_deadband_min_day": 0.43,
                            "target_vpd_deadband_max_day": 0.6,
                            "target_vpd_deadband_min_day": 0.5,
                            "target_rh_deadband_max_night": 0.57,
                            "target_rh_deadband_min_night": 0.46,
                            "target_vpd_deadband_max_night": 0.66,
                            "target_vpd_deadband_min_night": 0.5,
                            "target_amb_temp_deadband_max_day": 24,
                            "target_amb_temp_deadband_min_day": 18,
                            "target_amb_temp_deadband_max_night": 24,
                            "target_amb_temp_deadband_min_night": 18
                        }, {
                            "type": "action",
                            "hardware": "fertigation",
                            "target_ec_max": 31,
                            "target_ec_min": 1,
                            "target_ph_max": 7,
                            "target_ph_min": 5,
                            "target_ec_deadband_max": 24,
                            "target_ec_deadband_min": 1,
                            "target_ph_deadband_max": 6.5,
                            "target_ph_deadband_min": 5.5,
                            "target_water_temperature_max": 24,
                            "target_water_temperature_min": 15,
                            "target_water_temperature_deadband_max": 22,
                            "target_water_temperature_deadband_min": 18
                        }, {
                            "type": "action",
                            "hardware": "lighting",
                            "fade_curve_type": "linear",
                            "spectra_450_led": 50,
                            "spectra_660_led": 50,
                            "spectra_main_led": 100,
                            "fade_curve_duration": "00:30:00"
                        }],
                        "days_max": 14,
                        "days_min": 7,
                        "duration": "12:00:00"
                    }],
                    "grow_cycle_id": "18",
                    "current_cycle_start": "2024-03-30T16:32:40+08:00",
                    "current_phase": "transplant_recovery",
                    "current_phase_start": "2024-04-15T01:03:54.206626+0800"
                },
                "time": "2024-04-15T01:03:54.206787+0800",
                "type": "instruction_set"
            }
        }
    }
    msg = json.dumps(data)
    # print(msg)
    start(msg)
# index = 10
# while index > 0:
#     time.sleep(5)
#     start(json.dumps(msg))
#     index -= 1
#     print(f'index: {index}')
