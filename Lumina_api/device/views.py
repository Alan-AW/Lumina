from rest_framework.views import APIView
from django.http import JsonResponse

from device.rabbit_mq.producer import start


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
        return JsonResponse({'status': 'success'})
