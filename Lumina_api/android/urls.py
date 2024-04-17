from django.urls import path, re_path
from android.views import CompanyRoomDeepDataView, UnitDescView, AndroidSettingsView, SendCmdToMQView, SendDataToMQView, \
    CultivarChoicesView, CultivarAlgorithmChoicesView, SendAlgorithmToMQView, UpdateUnitInfoView, AppOtaApkView

app_name = 'android'
urlpatterns = [
    # 首页区域内所有房间信息列表
    re_path(r'company/room/unit/list', CompanyRoomDeepDataView.as_view()),
    # 点击房间内的单独机器，获取详情数据和图表信息
    re_path(r'unit/desc/(?P<unit_id>\d+)$', UnitDescView.as_view()),
    # 先不做-2023-11-13/安卓端读取设备设置值API-2024-1-13完成
    re_path(r'get/unit/settings/(?P<unit_id>\w+)$', AndroidSettingsView.as_view()),
    # 安卓端admin修改设备配置项入库并推上mq动态队列-2024-1-13完成
    re_path(r'send/cmd/to/mq/(?P<unit_id>\w+)$', SendCmdToMQView.as_view()),
    # 接收json数据，入库&&推mq-非安卓app使用的API
    path('send/data/to/mq', SendDataToMQView.as_view()),
    # 2024-2-5安卓端添加品类,回显品类列表供安卓端选择
    path('cultivar/choices', CultivarChoicesView.as_view()),
    #  2024-2-5安卓端添加算法,回显算法列表供安卓端选择
    re_path(r'algorithm/choices/(?P<cultivar_id>\d+)$', CultivarAlgorithmChoicesView.as_view()),
    # 2024-2-5安卓端选择了算法之后将数据提交到服务器进行处理和推送
    path('unit/cultivar/algorithm', SendAlgorithmToMQView.as_view()),
    # 安卓端更新设备算法,入库更新+重新推送
    path('update/unit/algorithm', UpdateUnitInfoView.as_view()),
    # 安卓端APP的OTA升级
    path('app/ota/apk', AppOtaApkView.as_view())
]
