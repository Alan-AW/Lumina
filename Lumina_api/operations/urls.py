from django.urls import path, re_path
from operations.views import RoomView, ZoneView, UnitView, ChoicesZoneView

app_name = 'operations'
urlpatterns = [
    path('room', RoomView.as_view()),
    path('zone', ZoneView.as_view()),
    path('unit', UnitView.as_view()),
    path('zone/choices', ChoicesZoneView.as_view()),
]
