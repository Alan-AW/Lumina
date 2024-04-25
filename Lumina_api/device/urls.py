from django.urls import path, re_path
from device.views import SendMessage, GetUnitSensorView, TestCreateDataView

app_name = 'device'
urlpatterns = [
    path('send/msg', SendMessage.as_view()),
    # 查询
    re_path(r'get/unit/data/(?P<device_id>\w+)$', GetUnitSensorView.as_view()),
    path('create', TestCreateDataView.as_view())
]
