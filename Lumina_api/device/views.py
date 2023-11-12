from rest_framework.views import APIView
from django.http import JsonResponse

from utils.methods import return_response


# 机器设备上传json文件API
class DeviceUploadJsonView(APIView):

    def post(self, request):
        data = request.data
        response = return_response(data=data, info='upload json data success!')
        return JsonResponse(response)
