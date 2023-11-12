import pika
from device.rabbit_mq.config import HOST, PORT, USER, PASSWORD, QUEUE_NAME

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
def send_message_to_queue(message):
    channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)
    # 关闭连接
    connection.close()


# 接收消息-回调函数
def callback_demo(ch, method, properties, body):
    """
    1. ch：表示通道（channel），用于与消息队列进行交互的通道对象。
    2. method：表示方法（method），包含了与消息相关的方法信息，例如交换机、路由键等。
    3. properties：表示属性（properties），包含了与消息相关的属性信息，例如消息的持久性、优先级等。
    4. body：表示消息体（body），即实际的消息内容。
    """
    print(f'[x] Received message body is {body}')


# 接收消息
def receive_message_from_queue(callback=callback_demo):
    # 确定监听队列
    channel.basic_consume(
        queue=QUEUE_NAME,  # 要监听的队列名称
        auto_ack=True,  # 应答参数，默认应答，简单模式下默认即可
        on_message_callback=callback  # 回调函数
    )

    print('[*] Waiting for messages.')
    channel.start_consuming()
    # 开始监听消息队列
    channel.start_consuming()


# 停止监听队列
def stop_listen_queue():
    # 停止监听
    channel.stop_consuming()
    # 关闭连接
    connection.close()
