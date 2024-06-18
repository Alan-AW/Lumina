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
QUEUE_NAME = "execution_command_queue"
"""

HOST = 'rabbitmq-serverless-cn-jmp3pov8d01.cn-shanghai.amqp-20.net.mq.amqp.aliyuncs.com'
PORT = 5372
USER = 'MjpyYWJiaXRtcS1zZXJ2ZXJsZXNzLWNuLWptcDNwb3Y4ZDAxOkxUQUk1dFNXc1pEdXA2N0JkM1QxSGN0Rw=='
PASSWORD = 'Mzc3NjZBNzZCODA1RjUxNjc2Njc4NzE5RDZGRjRGREZDQjZBNzk1NDoxNzE0MDU3OTU4Nzgy'
QUEUE_NAME = "execution_command_queue"


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
        "algorithm": {
            "time": "2024-06-16T19:45:33+08:00",
            "version": "0.5A.0",
            "device_id": "8RC4KBGY",
            "grow_cycle_id": 74
        },
        "unit_device_id": "8RC4KBZ7"
    }
    msg = json.dumps(data)
    # print(msg)
    start(msg, '8RC4KBZ7')
# index = 10
# while index > 0:
#     time.sleep(5)
#     start(json.dumps(msg))
#     index -= 1
#     print(f'index: {index}')
