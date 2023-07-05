from django.urls import path, re_path
from operations.views import RoomView, ZoneView, UnitView, ChoicesZoneView, ZoneDeepDataView

app_name = 'operations'
urlpatterns = [
    re_path(r'zone/(?P<row_id>\d+)?$', ZoneView.as_view()),
    re_path(r'room/(?P<row_id>\d+)?$', RoomView.as_view()),
    re_path(r'unit/(?P<row_id>\d+)?$', UnitView.as_view()),
    path('zone/choices', ChoicesZoneView.as_view()),
    path('zone/deep', ZoneDeepDataView.as_view())
]
