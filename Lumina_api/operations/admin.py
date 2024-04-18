from django.contrib import admin
from operations.models import Company, Room, Unit, Temperature, Fertilizer, \
    UnitPlantDesc, Lighting, UnitSetting, UnitSettingsList, Cultivar, Algorithm


# 企业
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'address', 'legal_rep', 'tel', 'email', 'create_time', 'update_time']
    list_editable = ['name', 'address', 'legal_rep', 'tel', 'email']
    search_fields = ['name', 'address', 'tel', 'email', 'legal_rep']


# 房间
@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'serial_number', 'company', 'create_time', 'update_time']
    list_editable = ['serial_number', 'company']
    search_fields = ['serial_number']


# 机器
@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ['id', 'serial_number', 'deviceId', 'deviceSecret', 'room', 'status', 'create_time',
                    'update_time']
    list_editable = ['serial_number', 'deviceId', 'deviceSecret', 'room', 'status']
    search_fields = ['serial_number']


# 设备功能值管理
@admin.register(UnitSetting)
class UnitSettingsAdmin(admin.ModelAdmin):
    list_display = ['id', 'unit', 'cmd', 'auto', 'value']
    list_editable = ['unit', 'cmd', 'auto', 'value']
    search_fields = ['unit']


# 机器设备所支持的功能
@admin.register(UnitSettingsList)
class UnitSettingsListAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'cmd', 'category_cn', 'category_en', 'desc_cn', 'desc_en', 'component', 'step',
        'min_value', 'max_value', 'unit_cn', 'unit_en', 'create_time', 'update_time'
    ]
    list_editable = [
        'cmd', 'category_cn', 'category_en', 'desc_cn', 'desc_en', 'component', 'step',
        'min_value', 'max_value', 'unit_cn', 'unit_en'
    ]


# 品类表
@admin.register(Cultivar)
class CultivarAdmin(admin.ModelAdmin):
    filter_horizontal = ('algorithm',)
    list_display = ['id', 'icon', 'name_en', 'name_cn', 'desc_cn', 'desc_en', 'cycle']
    list_editable = ['icon', 'name_en', 'name_cn', 'desc_cn', 'desc_en', 'cycle']


# 品类算法表
@admin.register(Algorithm)
class AlgorithmAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'subject_cn', 'subject_en', 'title_cn', 'title_en', 'desc_cn', 'desc_en',
        'choices_cn', 'choices_en', 'choices_self', 'cmd', 'app_show'
    ]
    list_editable = [
        'subject_cn', 'subject_en', 'title_cn', 'title_en', 'desc_cn', 'desc_en',
        'choices_cn', 'choices_en', 'choices_self', 'cmd', 'app_show'
    ]


# 设备种植的品类详情
@admin.register(UnitPlantDesc)
class UnitPlantDescAdmin(admin.ModelAdmin):
    list_display = ['id', 'unit', 'cultivar', 'algorithm', 'status', 'create_time']
    list_editable = ['unit', 'cultivar', 'algorithm', 'status']


# 温度传感器
@admin.register(Temperature)
class TemperatureAdmin(admin.ModelAdmin):
    list_display = ['id', 'moment', 'deviceId', 'deviceSecret', 'json_val']
    list_editable = ['deviceId', 'deviceSecret', 'json_val']
    search_fields = ['deviceId', 'deviceSecret']


# 水肥传感器
@admin.register(Fertilizer)
class FertilizerAdmin(admin.ModelAdmin):
    list_display = ['id', 'moment', 'deviceId', 'deviceSecret', 'json_val']
    list_editable = ['deviceId', 'deviceSecret', 'json_val']
    search_fields = ['deviceId', 'deviceSecret']


# 光照传感器
@admin.register(Lighting)
class LightingAdmin(admin.ModelAdmin):
    list_display = ['id', 'moment', 'deviceId', 'deviceSecret', 'json_val']
    list_editable = ['deviceId', 'deviceSecret', 'json_val']
    search_fields = ['deviceId', 'deviceSecret']
