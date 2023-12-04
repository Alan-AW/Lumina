from rest_framework.views import APIView
from django.http import JsonResponse

from utils.methods import return_response
from device.rabbit_mq.producer import start


# 机器设备上传json文件API
class DeviceUploadJsonView(APIView):

    def post(self, request):
        data = request.data
        response = return_response(data=data, info='upload json data success!')
        return JsonResponse(response)


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
