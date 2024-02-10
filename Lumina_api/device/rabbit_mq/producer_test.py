"""
生产者
"""

import pika
import time
import json

HOST = '43.138.127.42'
PORT = 5372
USER = 'admin'
PASSWORD = '1ee2097c'
QUEUE_NAME = "device_data_queue"


def start(message, device_id=None):
    queue_name = QUEUE_NAME
    # 动态队列名称
    if device_id:
        queue_name = f'{device_id}_{QUEUE_NAME}'
    print('**' * 50)
    print(f'queue_name: {queue_name}')
    print(f'message: {message}')
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
        # durable=True,
        # arguments={'x-single-active-consumer': False}
    )

    # 发送消息
    channel.basic_publish(exchange='', routing_key=queue_name, body=str(message).encode())

    # 关闭连接
    connection.close()


if __name__ == '__main__':
    msg = {'deviceId': 'test', 'command': 'command_1', 'params': 'params_1'}
    start(msg)
    # index = 10
    # while index > 0:
    #     time.sleep(5)
    #     start(json.dumps(msg))
    #     index -= 1
    #     print(f'index: {index}')
