from django.db import models


class SendMessageToQueue(models.Model):
    device_id = models.CharField(max_length=100, verbose_name='设备id(动态队列前缀)')
    time = models.DateTimeField(verbose_name='时间')
    grow_cycle_id = models.CharField(max_length=100, verbose_name='增长周期id')
    version = models.CharField(max_length=100, verbose_name='版本号')
    data = models.JSONField(default=dict, verbose_name='数据')
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'send_message_to_queue'
        verbose_name = 'Send Message To Queue'
        verbose_name_plural = 'Send Message To Queue'
        ordering = ['-create_time']

    def __str__(self):
        return self.device_id
