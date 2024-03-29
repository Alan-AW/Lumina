from django.urls import path, re_path
from operations.views import RoomView, UnitView, SaveSensorDataView, ExportThree, SpeciesView, CultivarsView, \
    ModelsView, PhasesView, InstructionView, ActionView, TriggersView, CompanyView, CompanyUploadLogo, UnitSettingsListView, \
    UnitSettingView, GetUnitOnlineView, UnitInfoView, CultivarView, CultivarAlgorithmView, AlgorithmView
from operations.choices_api_view import ChoicesRoomView, ChoicesRoleView, ChoicesCompanyView, \
    ChoicesEnvironmentalOptions, ChoicesUnitSettings, CultivarChoicesAlgorithmView, GetCultivarAlgorithmView

app_name = 'operations'
urlpatterns = [
    # 房间管理
    re_path(r'room/(?P<row_id>\d+)?$', RoomView.as_view()),
    # 机器设备管理
    re_path(r'unit/(?P<row_id>\d+)?$', UnitView.as_view()),
    # 机器功能设置
    re_path(r'unit/settings/(?P<unit_id>\d+)$', UnitSettingView.as_view()),
    # 下拉框选项
    path('room/choices', ChoicesRoomView.as_view()),
    path('company/choices', ChoicesCompanyView.as_view()),
    path('role/choices', ChoicesRoleView.as_view()),
    path('company/choices', ChoicesCompanyView.as_view()),
    path('unit/settings/list/choices', ChoicesUnitSettings.as_view()),
    path('choices/environmentalOptions', ChoicesEnvironmentalOptions.as_view()),
    # 上传公司logo
    re_path(r'company/uploadlogo/(?P<row_id>\d+)$', CompanyUploadLogo.as_view()),
    # 公司管理
    re_path(r'company/(?P<row_id>\d+)?', CompanyView.as_view()),
    # 设备可用设置项管理
    re_path(r'unit/settings/list/(?P<row_id>\d+)?', UnitSettingsListView.as_view()),
    # 2024-2-4新增功能接口
    # 1.开放接口查询所有在线和不在线的设备
    path('get/unit/online', GetUnitOnlineView.as_view()),
    # 2.开放接口查询指定设备信息
    re_path(r'get/unit/info/(?P<device_id>\d+)$', UnitInfoView.as_view()),
    # 3.品类管理
    re_path(r'cultivar/(?P<row_id>\d+)?$', CultivarView.as_view()),
    # 4.品类管理选择算法
    path('algorithm/choices', CultivarChoicesAlgorithmView.as_view()),
    # 品类管理-分配算法
    path('cultivar/algorithm', CultivarAlgorithmView.as_view()),
    # 5.算法管理
    re_path(r'algorithm/(?P<row_id>\d+)?$', AlgorithmView.as_view()),
    # ############################## 以下API是否需要：待定 ##############################
    # 传感器请求保存数据
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
]
