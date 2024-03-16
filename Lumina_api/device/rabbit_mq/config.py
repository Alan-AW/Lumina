HOST = '43.138.127.42'
PORT = 5372
USER = 'admin'
PASSWORD = '1ee2097c'
QUEUE_NAME = 'device_data_queue'

# 队列名称集合
"""
1.
很早之前的，不一定有效，但接口在线
服务端推送消息：/device/send/msg接口使用
设备ID_execution_command_queue

2.
安卓端admin修改设备配置项入库并推上mq动态队列：/android/send/cmd/to/mq/接口使用
设备ID_manual_command_queue

3.
 <逻辑核心> 调用，接收json数据，入库&&推mq：/android/send/data/to/mq接口使用
设备ID_execution_command_queue

4.
安卓端选择了算法之后将数据提交到服务器进行处理和推送：/android/unit/cultivar/algorithm接口使用
设备ID_command
"""
