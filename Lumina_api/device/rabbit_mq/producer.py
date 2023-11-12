"""
生产者
"""

import pika
from device.rabbit_mq.config import HOST, PORT, USER, PASSWORD

# 创建凭据对象
credentials = pika.PlainCredentials(USER, PASSWORD)

# 创建连接参数对象
parameters = pika.ConnectionParameters(HOST, credentials=credentials)

# 连接到RabbitMQ服务器
connection = pika.BlockingConnection(parameters)
channel = connection.channel()

# 声明队列
channel.queue_declare(queue='device_data_queue')

# 发送消息
message = 'Hello, RabbitMQ!'
channel.basic_publish(exchange='', routing_key='device_data_queue', body=message)

# 关闭连接
connection.close()
