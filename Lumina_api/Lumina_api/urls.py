from django.contrib import admin
from django.urls import path, re_path, include
from django.views import static
from django.views.static import serve
from django.conf import settings as d_sys
from upload_file.views import UploadFileView

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^static/(?P<path>.*)$', static.serve, {'document_root': d_sys.STATIC_ROOT}, name='static'),
    # 后台静态文件配置
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': d_sys.MEDIA_ROOT}),  # media配置 ----  也可以使用追加路由
    path('upload', UploadFileView.as_view()),  # 全局上传接口
    path('auth/', include(('users.urls', 'users'), namespace='users')),
]
