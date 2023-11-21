from django.urls import path
from device.views import DeviceUploadJsonView, SendMessage

app_name = 'device'
urlpatterns = [
    # 设备上传jsonAPI
    path('upload/json', DeviceUploadJsonView.as_view(), name='device_upload_json'),
    path('send/msg', SendMessage.as_view())
]
