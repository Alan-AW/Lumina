import pika
import threading
import pymysql
import json
import datetime

# from device.rabbit_mq.config import HOST, PORT, USER, PASSWORD, QUEUE_NAME

"""
43.138.127.42服务器mq配置信息：
HOST = '43.138.127.42'
PORT = 5372
USER = 'admin'
PASSWORD = '1ee2097c'
QUEUE_NAME = "execution_command_queue"
"""

# 阿里云mq服务配置信息
HOST = 'rabbitmq-serverless-cn-jmp3pov8d01.cn-shanghai.amqp-20.net.mq.amqp.aliyuncs.com'
PORT = 5372
USER = 'MjpyYWJiaXRtcS1zZXJ2ZXJsZXNzLWNuLWptcDNwb3Y4ZDAxOkxUQUk1dFNXc1pEdXA2N0JkM1QxSGN0Rw=='
PASSWORD = 'Mzc3NjZBNzZCODA1RjUxNjc2Njc4NzE5RDZGRjRGREZDQjZBNzk1NDoxNzE0MDU3OTU4Nzgy'
QUEUE_NAME = "device_data_queue"

# 数据库配置信息
db_config = {
    'host': '47.110.240.100',
    'user': 'mqsw_test',
    'password': 'crFtCczbNhiXeiZP',
    'database': 'mqsw_test',
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

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


# 插入数据库操作
def insert_data_to_db(device_id, content):
    conn, cursor = None, None
    # 建立数据库连接
    try:
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()
        # SQL 插入语句
        sql = "INSERT INTO message_queue (device_id, content, create_time, update_time) VALUES (%s, %s, %s, %s)"
        # 将 content Python 字典转换为 JSON 字符串
        content_json = json.dumps(content)
        timer = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        # 执行 SQL 语句
        cursor.execute(sql, (device_id, content_json, timer, timer))
        conn.commit()  # 提交事务
        print("Data inserted successfully.")
    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        if conn is not None:
            conn.rollback()  # 出现错误时回滚
    finally:
        # 关闭游标和连接
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()


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
        device_id = data.get('deviceId') or 'error'
        insert_data_to_db(device_id, data)
    except Exception as e:
        # 重启监听线程
        # start()
        # 跳过
        print(f'回调错误：{e}')


def start():
    # 创建队列
    channel.queue_declare(queue=QUEUE_NAME, durable=True)
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
