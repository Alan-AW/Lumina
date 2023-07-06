from django.contrib import admin
from upload_file.models import UploadFile


@admin.register(UploadFile)
class UploadFileAdmin(admin.ModelAdmin):
    list_display = ['id', 'file_name', 'file']
    list_editable = ['file']
    search_fields = ['file_name']
