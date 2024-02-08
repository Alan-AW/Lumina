import os
import subprocess
from django.apps import AppConfig
from django.conf import settings


class DeviceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'device'

    def ready(self):
        # 启动Python脚本,开始监听队列
        script_path = os.path.join(settings.BASE_DIR, 'device', 'rabbit_mq', 'consumer.py')
        subprocess.Popen(['python', script_path])
