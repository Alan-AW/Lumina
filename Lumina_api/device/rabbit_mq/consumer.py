"""
消费者
"""

import pika

# 创建凭据对象
credentials = pika.PlainCredentials('admin', '1ee2097c')

# 创建连接参数对象
parameters = pika.ConnectionParameters('43.138.127.42', credentials=credentials)

# 链接RabbitMQ
connection = pika.BlockingConnection(parameters)
# 控制对象
channel = connection.channel()
# 创建队列，队列名称为 hello
# 为了保证消息队列中一定有一个叫hello的队列，所以生产者和消费者都需要创建一次队列，谁先创建就用谁的。
channel.queue_declare(queue='device_data_queue')


# 回调函数
def callback(ch, method, properties, body):
    """
    1. ch：表示通道（channel），用于与消息队列进行交互的通道对象。
    2. method：表示方法（method），包含了与消息相关的方法信息，例如交换机、路由键等。
    3. properties：表示属性（properties），包含了与消息相关的属性信息，例如消息的持久性、优先级等。
    4. body：表示消息体（body），即实际的消息内容。
    """
    print(f'[x] Received message body is {body}')


# 确定监听队列
channel.basic_consume(
    queue='device_data_queue',  # 要监听的队列名称
    auto_ack=True,  # 应答参数，默认应答，简单模式下默认即可
    on_message_callback=callback  # 回调函数
)

print('[*] Waiting for messages. To exit press CTRL+C')

# 开始监听消息队列
channel.start_consuming()

# 停止监听
# channel.stop_consuming()
