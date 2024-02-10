from django.db import models


# 监听第一个消息队列的内容，入库
class MessageQueueModel(models.Model):
    device_id = models.CharField(max_length=32)
    content = models.JSONField()
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'message_queue'
        verbose_name = '消息队列'

    def __str__(self):
        return self.id
