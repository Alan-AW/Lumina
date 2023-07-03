from django.contrib import admin
from django.urls import path
from upload_file.views import UploadFileView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('upload', UploadFileView.as_view()),  # 全局上传接口
]
