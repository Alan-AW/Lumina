from django.urls import path, re_path
from operations.views import RoomView, ZoneView, UnitView, ChoicesZoneView, ChoicesRoomView, ChoicesRoleView, \
    SaveSensorDataView, ExportThree, SpeciesView, CultivarsView, \
    ModelsView, PhasesView, InstructionView, ActionView, TriggersView, ChoicesEnvironmentalOptions

app_name = 'operations'
urlpatterns = [
    re_path(r'zone/(?P<row_id>\d+)?$', ZoneView.as_view()),
    re_path(r'room/(?P<row_id>\d+)?$', RoomView.as_view()),
    re_path(r'unit/(?P<row_id>\d+)?$', UnitView.as_view()),
    path('zone/choices', ChoicesZoneView.as_view()),
    path('room/choices', ChoicesRoomView.as_view()),
    path('role/choices', ChoicesRoleView.as_view()),
    re_path(r'save/sensor/(?P<types>temperature|lighting)$', SaveSensorDataView.as_view()),
    # 数据结构导出数据
    path('export/three', ExportThree.as_view()),
    # 数据结构6张表分表管理
    re_path(r'species/(?P<row_id>\d+)?$', SpeciesView.as_view()),
    re_path(r'cultivars/(?P<row_id>\d+)?$', CultivarsView.as_view()),
    re_path(r'models/(?P<row_id>\d+)?$', ModelsView.as_view()),
    re_path(r'phases/(?P<row_id>\d+)?$', PhasesView.as_view()),
    re_path(r'instruction/(?P<row_id>\d+)?$', InstructionView.as_view()),
    re_path(r'action/(?P<row_id>\d+)?$', ActionView.as_view()),
    re_path(r'triggers/(?P<row_id>\d+)?$', TriggersView.as_view()),
    path('choices/environmentalOptions', ChoicesEnvironmentalOptions.as_view())
]
