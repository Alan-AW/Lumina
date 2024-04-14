from django.urls import path, re_path
from device.views import SendMessage, GetUnitSensorView

app_name = 'device'
urlpatterns = [
    path('send/msg', SendMessage.as_view()),
    # 查询
    re_path(r'get/unit/data/(?P<device_id>\w+)$', GetUnitSensorView.as_view())
]
