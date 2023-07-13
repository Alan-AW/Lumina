from django.urls import path, re_path
from operations.views import RoomView, ZoneView, UnitView, ChoicesZoneView, ChoicesRoomView, ChoicesRoleView,\
    ZoneDeepDataView, SaveSensorDataView, UnitDescView, AndroidSettingsView

app_name = 'operations'
urlpatterns = [
    re_path(r'zone/(?P<row_id>\d+)?$', ZoneView.as_view()),
    re_path(r'room/(?P<row_id>\d+)?$', RoomView.as_view()),
    re_path(r'unit/(?P<row_id>\d+)?$', UnitView.as_view()),
    path('zone/choices', ChoicesZoneView.as_view()),
    path('room/choices', ChoicesRoomView.as_view()),
    path('role/choices', ChoicesRoleView.as_view()),
    path('zone/deep', ZoneDeepDataView.as_view()),
    re_path(r'save/sensor/(?P<types>temperature|lighting)$', SaveSensorDataView.as_view()),
    path('unit/desc', UnitDescView.as_view()),
    path('android/settings', AndroidSettingsView.as_view())
]
