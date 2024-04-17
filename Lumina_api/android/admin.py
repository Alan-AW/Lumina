from django.contrib import admin
from android.models import AppOtaModel


@admin.register(AppOtaModel)
class AppOtaModalAdmin(admin.ModelAdmin):
    list_display = ['id', 'version', 'apk', 'create_time']
    search_fields = ['version']
