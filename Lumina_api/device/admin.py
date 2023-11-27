from django.contrib import admin
from device.models import MessageQueueModel


@admin.register(MessageQueueModel)
class MessageQueueModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'create_time', 'update_time']
    list_editable = ['content']
