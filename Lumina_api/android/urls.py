from django.urls import path, re_path
from android.views import ZoneDeepDataView, UnitDescView, AndroidSettingsView

app_name = 'android'
urlpatterns = [
    # 首页区域内所有房间信息列表
    re_path(r'zone/room/list/(?P<zone_id>\d+)$', ZoneDeepDataView.as_view()),
    # 点击房间内的单独机器，获取详情数据和图表信息
    re_path(r'unit/desc/(?P<unit_id>\d+)$', UnitDescView.as_view()),
    # 先不做-2023-11-13
    path('android/settings', AndroidSettingsView.as_view()),
]
