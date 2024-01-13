from django.urls import path, re_path
from android.views import ZoneDeepDataView, UnitDescView, AndroidSettingsView, SendCmdToMQView, SendDataToMQView

app_name = 'android'
urlpatterns = [
    # 首页区域内所有房间信息列表
    re_path(r'zone/room/list/(?P<zone_id>\d+)$', ZoneDeepDataView.as_view()),
    # 点击房间内的单独机器，获取详情数据和图表信息
    re_path(r'unit/desc/(?P<unit_id>\d+)$', UnitDescView.as_view()),
    # 先不做-2023-11-13/安卓端读取设备设置值API-2024-1-13完成
    re_path(r'get/unit/settings/(?P<unit_id>\w+)$', AndroidSettingsView.as_view()),
    # 安卓端admin修改设备配置项入库并推上mq动态队列-2024-1-13完成
    re_path(r'send/cmd/to/mq/(?P<unit_id>\w+)$', SendCmdToMQView.as_view()),
    # 接收json数据，入库&&推mq-非安卓app使用的API
    path('send/data/to/mq', SendDataToMQView.as_view()),
]
