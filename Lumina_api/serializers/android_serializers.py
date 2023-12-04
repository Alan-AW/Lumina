from rest_framework import serializers
from android.models import SendMessageToQueue


class SendMessageToQueueSer(serializers.ModelSerializer):
    class Meta:
        model = SendMessageToQueue
        exclude = ['create_time', 'update_time']
