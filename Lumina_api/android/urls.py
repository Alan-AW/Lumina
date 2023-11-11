from django.urls import path, re_path
from android.views import ZoneDeepDataView, UnitDescView, AndroidSettingsView

app_name = 'android'
urlpatterns = [
    path('zone/deep', ZoneDeepDataView.as_view()),
    re_path(r'unit/desc/(?P<unit_id>\d+)$', UnitDescView.as_view()),
    path('android/settings', AndroidSettingsView.as_view()),
]
