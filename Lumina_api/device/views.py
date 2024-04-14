from rest_framework.views import APIView
from django.http import JsonResponse

from device.models import MessageQueueModel
from device.rabbit_mq.producer import start
from utils.methods import return_response


class SendMessage(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def get(self, request):
        msg = {
            "type": "action",
            "hardware": ["lighting", "led_pwm"],
            "instruction": "turn_on",
            "value": [100, 100, 100],
            "curve": "linear",
            "curve_duration": "00:30:00"
        }
        start(msg)
        return JsonResponse({ 'status': 'success' })


class GetUnitSensorView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = []

    def get(self, request, device_id):
        queryset = MessageQueueModel.objects.filter(device_id=device_id).order_by('-id').first()
        content = queryset.content if queryset else {}
        response = return_response(data=content)
        return JsonResponse(response)
