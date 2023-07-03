from django.http import JsonResponse
from rest_framework.views import APIView
from serializers.upload_file_serializer import UploadFileSer
from utils.methods import return_response


class UploadFileView(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        img_name = request.data.get('img').name.split('.')[0]
        request.data['img_name'] = img_name
        ser = UploadFileSer(data=request.data)
        if ser.is_valid():
            ser.save()
            response = return_response(info='文件上传成功！', data=ser.data)
        else:
            response = return_response(status=False, error=ser.errors)
        return JsonResponse(response)
