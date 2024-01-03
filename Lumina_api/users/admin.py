from django.contrib import admin
from django.conf import settings as sys
from users.models import Permission, Roles, UserInfo, UserQrcodeImg, Logs

admin.site.site_header = sys.ADMIN_SITE_HEADER
admin.site.site_title = sys.ADMIN_SITE_TITLE
admin.site.index_title = sys.ADMIN_SITE_INDEX_TITLE


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'url', 'isNaviLink', 'create_time', 'update_time', 'pid']
    list_editable = ['title', 'url', 'isNaviLink', 'pid']
    search_fields = ['title', 'url']


@admin.register(Roles)
class RolesAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'create_time', 'update_time']
    list_editable = ['title', ]
    search_fields = ['title']


@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'account', 'password', 'is_super', 'first_name', 'last_name', 'role', 'status', 'qrcode', 'company',
        'create_time', 'update_time'
    ]
    list_editable = ['account', 'password', 'is_super', 'first_name', 'last_name', 'role', 'company', 'status']
    search_fields = ['account', 'first_name', 'last_name']


@admin.register(UserQrcodeImg)
class UserAvatarAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'qrcode']
    list_editable = ['user', 'qrcode']


@admin.register(Logs)
class LogsAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'role', 'table_name', 'command', 'content', 'create_time']
    readonly_fields = ['username', 'role', 'table_name', 'command', 'content', 'create_time']
    search_fields = ['username', 'command']
