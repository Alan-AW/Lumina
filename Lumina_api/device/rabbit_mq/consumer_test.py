"""
消费者
"""

import pika
import threading


HOST = '43.138.127.42'
PORT = 5372
USER = 'admin'
PASSWORD = '1ee2097c'
QUEUE_NAME = "test_queue"


# message_model = import_string('device.rabbit_mq.message_db.message_db_data')
# def message_model(message):
#     print(message)
# QUEUE_NAME = "abcdefg_execution_command_queue"

# 创建凭据对象
credentials = pika.PlainCredentials(USER, PASSWORD)

# 创建连接参数对象
parameters = pika.ConnectionParameters(HOST, credentials=credentials)

# 链接RabbitMQ
connection = pika.BlockingConnection(parameters)
# 控制对象
channel = connection.channel()


# 回调函数
def callback(ch, method, properties, body):
    """
    1. ch：表示通道（channel），用于与消息队列进行交互的通道对象。
    2. method：表示方法（method），包含了与消息相关的方法信息，例如交换机、路由键等。
    3. properties：表示属性（properties），包含了与消息相关的属性信息，例如消息的持久性、优先级等。
    4. body：表示消息体（body），即实际的消息内容。
    """
    try:
        str_body = body.decode('utf-8')
        replace_body = str_body.replace('false', 'False')
        data = eval(replace_body)
        print('[x] Received message body is:')
        print(data, type(data))
        raise ValueError('手动异常挂掉监听线程！')
    # message_model = import_string('device.rabbit_mq.message_db.message_db_data')
    # message_db_data(body)
    # message_model(body)
    # from device.models import MessageQueueModel
    # MessageQueueModel.objects.create(content=body)
    except Exception as e:
        print(f'错误：{e}')
        start()


def start():
    # 创建队列
    channel.queue_declare(queue=QUEUE_NAME)
    # 确定监听队列
    channel.basic_consume(
        queue=QUEUE_NAME,  # 要监听的队列名称
        auto_ack=True,  # 应答参数，默认应答，简单模式下默认即可
        on_message_callback=callback  # 回调函数
    )
    # 开始监听消息队列
    print('[*] Waiting for messages.')
    # channel.start_consuming()
    threading.Thread(target=channel.start_consuming).start()


# 停止监听
def stop():
    print('[*] Stopping consumer.')
    channel.stop_consuming()


if __name__ == '__main__':
    start()


# {"deviceId": "8RC4KBZ7", "data": {"deviceId": "8RC4KBZ7", "version": "0.5A.0", "last_updated": "2024-04-14T23:25:54.040006+0800", "instruction_set": {"device_id": "8RC4KBZ7", "data": {"tod": "12:55:40", "time": "2024-03-30T16:32:40+08:00", "type": "instruction_set", "version": "0.5A.0", "device_id": "8RC4KBZ7", "instructions": [{"phase": "transplant_recovery", "actions": [{"type": "action", "hardware": "climate", "vpd_priority_day": "temp", "target_rh_max_day": 0.6, "target_rh_min_day": 0.43, "target_vpd_max_day": 0.7, "target_vpd_min_day": 0.42, "vpd_priority_night": "rh", "target_rh_max_night": 0.57, "target_rh_min_night": 0.46, "target_vpd_max_night": 0.7, "target_vpd_min_night": 0.42, "target_amb_temp_max_day": 28, "target_amb_temp_min_day": 16, "target_amb_temp_max_night": 28, "target_amb_temp_min_night": 16, "target_rh_deadband_max_day": 0.6, "target_rh_deadband_min_day": 0.43, "target_vpd_deadband_max_day": 0.6, "target_vpd_deadband_min_day": 0.5, "target_rh_deadband_max_night": 0.57, "target_rh_deadband_min_night": 0.46, "target_vpd_deadband_max_night": 0.66, "target_vpd_deadband_min_night": 0.5, "target_amb_temp_deadband_max_day": 24, "target_amb_temp_deadband_min_day": 18, "target_amb_temp_deadband_max_night": 24, "target_amb_temp_deadband_min_night": 18}, {"type": "action", "hardware": "fertigation", "target_ec_max": 31, "target_ec_min": 1, "target_ph_max": 7, "target_ph_min": 5, "target_ec_deadband_max": 24, "target_ec_deadband_min": 1, "target_ph_deadband_max": 6.5, "target_ph_deadband_min": 5.5, "target_water_temperature_max": 24, "target_water_temperature_min": 15, "target_water_temperature_deadband_max": 22, "target_water_temperature_deadband_min": 18}, {"type": "action", "hardware": "lighting", "fade_curve_type": "linear", "spectra_450_led": 50, "spectra_660_led": 50, "spectra_main_led": 100, "fade_curve_duration": "00:30:00"}], "days_max": 14, "days_min": 7, "duration": "12:00:00"}], "grow_cycle_id": "18", "current_cycle_start": "2024-03-30T16:32:40+08:00"}, "time": "2024-04-14T21:03:06.727949+0800", "type": "instruction_set"}, "data": {"irthermal": {"reading": [[12.01, 10.25, 10.12, 12.18, 12.96, 11.32, 11.29, 12.26, 13.23, 11.81, 11.19, 12.61, 13.4, 12.01, 11.14, 12.82, 13.07, 11.86, 11.7, 13.13, 13.22, 12.03, 11.94, 13.18, 13.04, 11.86, 11.29, 13.39, 13.17, 11.74, 10.25, 12.15], [10.46, 13.84, 12.04, 12.3, 10.74, 13.78, 12.54, 12.31, 11.52, 13.38, 13.31, 12.45, 11.85, 13.6, 12.93, 12.17, 12.14, 13.23, 13.23, 12.47, 12.39, 13.69, 13.36, 12.16, 12.01, 13.27, 13.3, 11.84, 11.76, 12.82, 12.51, 10.9], [12.52, 10.79, 11.0, 12.37, 13.12, 11.48, 11.67, 12.93, 12.93, 12.11, 11.48, 12.69, 13.5, 12.17, 11.69, 12.73, 12.85, 12.12, 12.04, 13.23, 13.13, 12.53, 11.97, 13.19, 13.78, 12.21, 11.56, 13.16, 12.4, 11.61, 10.32, 12.19], [10.52, 13.13, 12.88, 12.56, 11.48, 12.94, 13.26, 12.45, 11.88, 12.97, 13.1, 12.22, 11.84, 13.36, 13.01, 12.44, 11.25, 13.31, 13.19, 12.42, 12.46, 13.44, 13.47, 12.51, 11.85, 13.18, 13.02, 11.6, 11.37, 12.63, 12.6, 10.87], [12.69, 11.4, 11.4, 12.37, 12.72, 11.69, 11.19, 13.06, 13.14, 11.65, 11.7, 12.45, 13.25, 12.22, 11.63, 13.13, 13.03, 12.35, 11.87, 13.0, 13.03, 12.25, 11.98, 13.44, 13.06, 11.62, 11.01, 12.42, 12.7, 11.3, 10.97, 12.49], [10.98, 13.54, 12.83, 12.32, 11.7, 13.06, 12.96, 12.55, 11.86, 12.89, 12.89, 12.37, 12.28, 13.29, 13.37, 12.34, 11.92, 13.07, 13.03, 11.96, 12.6, 13.2, 13.43, 12.01, 11.99, 13.01, 12.91, 11.42, 11.35, 12.86, 12.67, 11.52], [12.8, 11.69, 11.69, 12.51, 13.01, 12.24, 11.97, 12.98, 13.23, 12.05, 12.11, 12.79, 13.2, 12.33, 11.59, 13.09, 13.22, 12.39, 11.64, 12.68, 12.9, 11.77, 11.3, 12.83, 12.81, 12.0, 11.36, 12.4, 12.62, 11.6, 10.51, 12.62], [10.86, 13.17, 13.27, 12.22, 11.75, 13.46, 12.65, 12.21, 12.26, 13.47, 13.19, 12.12, 12.31, 13.32, 13.14, 12.46, 12.15, 13.34, 13.29, 12.3, 11.54, 12.94, 13.19, 12.03, 12.03, 12.79, 12.51, 11.46, 11.51, 12.46, 13.13, 11.27], [12.89, 11.6, 11.17, 12.78, 13.5, 12.21, 11.97, 12.48, 13.07, 12.18, 12.01, 13.23, 13.24, 12.17, 11.9, 12.85, 13.3, 12.64, 11.38, 12.77, 13.43, 11.86, 11.76, 12.85, 13.2, 12.04, 11.57, 12.76, 12.73, 11.91, 11.08, 12.43], [11.91, 13.54, 13.33, 12.42, 12.17, 13.74, 13.2, 12.24, 11.99, 13.4, 13.24, 12.69, 12.1, 13.45, 12.78, 12.32, 12.25, 13.21, 13.14, 12.21, 11.75, 13.43, 13.17, 12.19, 11.53, 13.32, 12.95, 11.76, 11.9, 12.95, 13.03, 11.63], [13.2, 11.75, 11.5, 12.14, 13.76, 11.98, 12.14, 12.8, 13.46, 12.02, 12.18, 13.13, 13.45, 12.44, 11.59, 12.78, 13.05, 11.91, 11.87, 13.01, 13.38, 12.1, 11.57, 12.85, 13.17, 11.63, 11.61, 12.73, 12.52, 11.85, 10.9, 12.19], [11.95, 13.03, 13.14, 12.53, 11.87, 13.66, 12.89, 12.33, 12.15, 13.1, 13.29, 12.27, 12.42, 13.07, 13.23, 12.04, 12.29, 12.94, 12.87, 12.41, 12.5, 12.98, 13.22, 12.17, 12.03, 13.3, 13.22, 12.08, 11.98, 12.81, 13.13, 11.67], [13.08, 11.77, 11.57, 12.87, 13.18, 11.82, 12.32, 13.18, 13.17, 12.23, 11.73, 12.78, 12.62, 11.99, 11.82, 12.94, 12.9, 12.38, 11.65, 12.55, 13.24, 11.94, 11.68, 12.78, 13.17, 11.88, 11.68, 12.76, 12.94, 12.22, 11.99, 13.0], [11.83, 14.03, 13.67, 13.17, 12.45, 13.77, 13.18, 12.5, 12.05, 13.33, 13.55, 11.97, 12.5, 13.52, 13.26, 12.02, 11.63, 13.08, 13.19, 12.08, 11.98, 13.1, 13.2, 12.04, 11.98, 12.9, 13.21, 11.88, 11.9, 13.08, 13.43, 12.36], [12.81, 12.12, 11.8, 13.28, 13.19, 11.78, 11.68, 12.88, 13.05, 11.99, 11.73, 13.04, 13.34, 12.18, 11.46, 13.13, 13.05, 12.17, 11.91, 12.79, 13.25, 12.24, 11.83, 13.17, 13.45, 12.17, 12.07, 13.28, 13.43, 12.69, 11.86, 13.44], [12.19, 13.39, 13.48, 12.36, 12.14, 13.61, 13.17, 12.33, 12.31, 12.87, 13.14, 12.54, 11.98, 13.35, 13.49, 12.02, 12.07, 13.0, 13.22, 12.31, 12.26, 13.01, 13.33, 12.26, 12.1, 13.5, 13.85, 12.55, 12.6, 13.11, 13.49, 11.98], [13.53, 12.57, 11.47, 12.9, 13.38, 12.22, 11.45, 12.92, 13.26, 11.98, 12.09, 13.02, 13.33, 12.19, 11.53, 13.05, 13.43, 12.12, 11.38, 13.6, 13.02, 12.38, 12.07, 12.89, 13.71, 12.42, 11.91, 13.53, 13.16, 12.19, 10.8, 13.81], [12.05, 13.28, 13.16, 12.27, 11.59, 13.06, 13.13, 12.18, 11.94, 13.19, 13.18, 12.56, 12.18, 13.32, 13.15, 12.44, 12.12, 13.33, 13.02, 12.07, 12.27, 13.32, 13.32, 12.36, 12.58, 13.55, 13.35, 12.57, 11.77, 13.55, 13.67, 12.49], [13.54, 11.9, 11.47, 12.72, 13.15, 11.84, 12.01, 13.31, 13.13, 12.35, 11.88, 12.82, 12.98, 12.58, 11.78, 12.8, 13.45, 12.35, 12.05, 13.18, 13.1, 12.34, 11.99, 13.28, 13.78, 12.12, 12.62, 13.24, 13.29, 12.02, 10.78, 13.23], [11.92, 13.39, 13.11, 11.89, 11.88, 12.89, 13.26, 12.31, 12.02, 13.68, 13.51, 12.55, 12.61, 13.3, 13.61, 12.56, 12.3, 13.42, 13.31, 12.75, 12.34, 13.41, 13.89, 12.78, 12.07, 13.65, 13.52, 12.88, 12.21, 12.94, 13.79, 11.81], [13.09, 11.87, 11.89, 12.75, 12.82, 12.39, 12.05, 13.1, 13.39, 12.0, 11.81, 13.04, 13.42, 12.15, 12.12, 12.98, 13.22, 12.45, 12.57, 13.54, 13.56, 12.42, 12.23, 13.68, 13.83, 12.22, 11.76, 13.25, 13.72, 11.48, 11.93, 13.06], [12.29, 13.5, 13.31, 12.31, 12.23, 13.38, 13.09, 12.52, 11.66, 13.31, 13.64, 12.57, 12.33, 13.33, 13.58, 12.18, 12.3, 13.44, 13.58, 12.59, 12.48, 13.27, 13.92, 12.4, 11.93, 13.51, 14.26, 12.49, 11.54, 12.63, 13.9, 11.41], [13.5, 11.6, 11.52, 13.09, 13.55, 12.1, 11.89, 13.11, 13.52, 11.68, 12.01, 13.17, 13.55, 12.08, 11.81, 13.2, 13.56, 12.36, 12.24, 13.2, 13.48, 12.73, 11.95, 13.24, 14.06, 12.33, 11.58, 13.39, 13.97, 11.2, 11.04, 13.01], [11.58, 14.11, 13.62, 12.26, 12.14, 13.33, 13.96, 12.26, 12.22, 13.84, 13.98, 12.65, 12.52, 13.68, 14.0, 12.7, 11.96, 13.68, 13.96, 12.51, 12.8, 13.36, 14.0, 12.8, 12.47, 14.06, 13.65, 12.2, 11.69, 13.08, 13.55, 11.79]], "probe_temp": 34.84, "last_updated": 1707565369.7962308}, "solar_irradiance": {"solar_irradiance": 0, "last_updated": 1707565370.3443475}, "fertigation": {"current_ec": 0.07, "current_ph": 6.84, "ec_alert_min": 0.5, "ec_alert_max": 4.0, "ph_alert_min": 4.0, "ph_alert_max": 8.0, "current_water_temp": 13.5, "current_water_level": 0, "current_last_updated": 1707565370.9169161}, "thc": {"temperature": 43.7, "humidity": 21.0, "co2": 465, "vpd": 7.0784398742387165, "last_updated": 1709289500.8773348, "position": "main_lower", "sensor_id": "main_lower", "main_upper": {"position": "main_upper", "temperature": 20.3, "humidity": 34.1, "co2": 499, "vpd": 1.5697771032661492, "last_updated": 1709289590.826981}, "main_lower": {"position": "main_lower", "temperature": 43.6, "humidity": 19.4, "co2": 465, "vpd": 7.184402492062391, "last_updated": 1709289590.9703069}}, "lighting": {"spectra_main_led": 150, "spectra_450_led": 150, "spectra_660_led": 150, "spectra_uva": false, "spectra_uvb": false, "spectra_uvc": false, "spectra_450_laser": false, "spectra_660_laser": false, "plant_uv": false, "last_saved": 1707655593.126636}}}}
