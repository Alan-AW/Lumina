from django.db import models


class MessageQueueModel(models.Model):
    content = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'message_queue'
        verbose_name = '消息队列'

    def __str__(self):
        return self.id
