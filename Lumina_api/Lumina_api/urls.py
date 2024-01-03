from django.contrib import admin
from django.urls import path, re_path, include
from django.views import static
from django.views.static import serve
from django.conf import settings as d_sys
from django.http import HttpResponse

urlpatterns = [
    path('', lambda request: HttpResponse('hello world')),
    path('admin/', admin.site.urls),
    re_path(r'^static/(?P<path>.*)$', static.serve, {'document_root': d_sys.STATIC_ROOT}, name='static'),
    # 后台静态文件配置
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': d_sys.MEDIA_ROOT}),  # media配置 ----  也可以使用追加路由
    # 用户模块
    path('auth/', include(('users.urls', 'users'), namespace='users')),
    # react 后台管理模块
    path('manager/', include(('operations.urls', 'operations'), namespace='operations')),
    # 安卓端API模块
    path('android/', include(('android.urls', 'android'), namespace='android')),
    # 设备上传json文件
    path('device/', include(('device.urls', 'device'), namespace='device')),
]
