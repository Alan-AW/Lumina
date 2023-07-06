from django.apps import AppConfig


class UploadFileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'upload_file'
    verbose_name = '图片文件'

    def ready(self):
        from signals.upload_signal import create_file_name, delete_file
