from django.urls import path, re_path
from operations.views import RoomView, UnitView, SaveSensorDataView, ExportThree, SpeciesView, CultivarsView, \
    ModelsView, PhasesView, InstructionView, ActionView, TriggersView, CompanyView, CompanyUnitDescView, CompanyCultivarsView, \
    ReloadJsonValView, CompanyUploadLogo, UnitSettingsListView, UnitSettingView, PingUnitTimerView, GetUnitOnlineView, UnitInfoView, \
    CultivarView, CultivarAlgorithmView, AlgorithmView, CultivarAlgorithmCmdView, PutDeviceIdToMqView
from operations.choices_api_view import ChoicesRoomView, ChoicesRoleView, ChoicesCompanyView, \
    ChoicesEnvironmentalOptions, ChoicesUnitSettings, CultivarChoicesAlgorithmView, ChoicesCultivarsView

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
    re_path(r'company/(?P<row_id>\d+)?$', CompanyView.as_view()),
    # 公司设备种植算法详情列表
    re_path(r'company/unitdesc/(?P<company_id>\d+)$', CompanyUnitDescView.as_view()),
    # 公司设备种植算法详情刷新单条种植记录的json数据
    re_path(r'company/unitdesc/reload/(?P<plant_id>\d+)$', ReloadJsonValView.as_view()),
    # 设备可用设置项管理
    re_path(r'unit/settings/list/(?P<row_id>\d+)?$', UnitSettingsListView.as_view()),
    # 2024-2-4新增功能接口
    # 1.开放接口查询所有在线和不在线的设备
    # 24-3-30:1.1间隔30sping一次接口，更新unit ping字段时间戳值
    re_path(r'ping/unit/(?P<device_id>\w+)$', PingUnitTimerView.as_view()),
    # 24-3-30:1.2查询设备在线状态接口
    path('get/unit/online', GetUnitOnlineView.as_view()),
    # 2.开放接口查询指定设备算法信息-24-3-30改为用种植记录数据库id查询-24-3-31改回用设备ID查询
    # 24-4-1,逻辑核心查询大json数据
    re_path(r'get/unit/cycle/(?P<device_id>\w+)$', UnitInfoView.as_view()),
    # 供安卓端使用的查询大json数据
    re_path(r'get/unit/info/(?P<device_id>\w+)$', UnitInfoView.as_view()),
    # 3.品类管理
    re_path(r'cultivar/(?P<row_id>\d+)?$', CultivarView.as_view()),
    # 4.品类管理选择算法
    path('algorithm/choices', CultivarChoicesAlgorithmView.as_view()),
    # 品类管理-分配算法
    path('cultivar/algorithm', CultivarAlgorithmView.as_view()),
    # 品类管理-查询品类算法与指令集--提交品类算法对应的指令集
    re_path(r'cultivar/algorithm/cmd/edit/(?P<cultivar_id>\d+)$', CultivarAlgorithmCmdView.as_view()),
    # 5.算法管理
    re_path(r'algorithm/(?P<row_id>\d+)?$', AlgorithmView.as_view()),
    # 24-4-17新增功能：公司品类权限管理，（超管用户权限）
    re_path(r'company/cultivars/(?P<company_id>\d+)$', CompanyCultivarsView.as_view()),
    path('choices/cultivars', ChoicesCultivarsView.as_view()),
    # 24-6-16新增功能：接受device_id参数推入mq队列
    re_path(r'put/deviceid/to/mq/(?P<device_id>\w+)$', PutDeviceIdToMqView.as_view()),
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
