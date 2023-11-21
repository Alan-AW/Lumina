from django.apps import AppConfig
from device.rabbit_mq import consumer


class DeviceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'device'

    def ready(self):
        # 项目启动开始监听队列
        consumer.start()
