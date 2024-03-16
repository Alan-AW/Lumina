# import os
# import subprocess
import threading
# from multiprocessing import Process
from django.apps import AppConfig
# from django.conf import settings
from device.rabbit_mq.consumer import start as mq_start


class DeviceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'device'

    def ready(self):
        # 启动Python脚本,开始监听队列
        # script_path = os.path.join(settings.BASE_DIR, 'device', 'rabbit_mq', 'consumer.py')
        # subprocess.Popen(['python', script_path])
        # start()
        # 直接开启一个线程去处理队列即可
        # threading.Thread(target=mq_start).start()
        # Process(target=start).start()
        pass
