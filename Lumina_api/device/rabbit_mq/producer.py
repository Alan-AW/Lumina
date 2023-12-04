"""
生产者
"""

import pika
from device.rabbit_mq.config import HOST, PORT, USER, PASSWORD


QUEUE_NAME = "execution_command_queue"


def start(message='Hello, RabbitMQ!'):
    # 创建凭据对象
    credentials = pika.PlainCredentials(USER, PASSWORD)

    # 创建连接参数对象
    parameters = pika.ConnectionParameters(HOST, credentials=credentials)

    # 连接到RabbitMQ服务器
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    # 声明队列
    channel.queue_declare(queue=QUEUE_NAME)

    # 发送消息
    channel.basic_publish(exchange='', routing_key='device_data_queue', body=message)

    # 关闭连接
    connection.close()


# if __name__ == '__main__':
#     index = 10
#     while index > 0:
#         time.sleep(5)
#         start(json.dumps(msg))
#         index -= 1
#         print(f'index: {index}')
