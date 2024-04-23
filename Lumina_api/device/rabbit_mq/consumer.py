import pika
import threading

# from device.rabbit_mq.config import HOST, PORT, USER, PASSWORD, QUEUE_NAME

HOST = '43.138.127.42'
PORT = 5372
USER = 'admin'
PASSWORD = '1ee2097c'
QUEUE_NAME = 'device_data_queue'

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
    print('↓' * 50)
    print('收到队列消息：')
    print('↑' * 50)
    try:
        # 将字节串转为字典
        str_body = body.decode('utf-8')
        replace_body = str_body.replace('false', 'False')
        data = eval(replace_body)
        device_id = data.get('deviceId') or 'error:can_not_find_device_id'
        from device.models import MessageQueueModel
        MessageQueueModel.objects.create(device_id=device_id, content=data)
    except:
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
    print('+' * 50)
    print('开始监听队列消息')
    print('+' * 50)
    # channel.start_consuming()
    threading.Thread(target=channel.start_consuming).start()


# 停止监听
def stop():
    print('[*] Stopping consumer.')
    channel.stop_consuming()
