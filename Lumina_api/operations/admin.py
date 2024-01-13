from django.contrib import admin
from operations.models import Company, Room, RoomDesc, Unit, Temperature, Fertilizer, \
    Plant, PlantDesc, Lighting, UnitSetting, UnitSettingsList


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
        'id', 'cmd', 'desc_cn', 'desc_en', 'component', 'step',
        'min_value', 'max_value', 'unit_cn', 'unit_en', 'create_time', 'update_time'
    ]
    list_editable = [
        'cmd', 'desc_cn', 'desc_en', 'component', 'step',
        'min_value', 'max_value', 'unit_cn', 'unit_en'
    ]


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


# 作物
@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'type', 'name_en', 'name_cn', 'desc_en', 'desc_cn', 'status', 'create_time', 'update_time'
    ]
    list_editable = ['type', 'name_en', 'name_cn', 'desc_en', 'desc_cn', 'status']
    search_fields = ['type', 'name_en', 'name_cn']


# 作物详情
@admin.register(PlantDesc)
class PlantDescAdmin(admin.ModelAdmin):
    list_display = ['id', 'unit', 'plant', 'cycle', 'icon_path', 'create_time']
    list_editable = ['unit', 'plant', 'cycle', 'icon_path', ]
