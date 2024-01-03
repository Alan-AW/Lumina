from django.contrib import admin
from operations.models import Company, Room, RoomDesc, Unit, Temperature, Fertilizer, \
    Plant, PlantDesc, Lighting


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


# 房间详情
@admin.register(RoomDesc)
class RoomDescAdmin(admin.ModelAdmin):
    list_display = ['id', 'room', 'json_val']
    list_editable = ['room', 'json_val']


# 机器
@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ['id', 'serial_number', 'deviceId', 'deviceSecret', 'room', 'status', 'create_time',
                    'update_time']
    list_editable = ['serial_number', 'deviceId', 'deviceSecret', 'room', 'status']
    search_fields = ['serial_number']


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

# 安卓端APP设置文件
# @admin.register(AndroidSettings)
# class AndroidSettingsAdmin(admin.ModelAdmin):
#     list_display = ['id', 'phase_control', 'automatic', 'uvb', 'uvc', 'deep_blue', 'main', 'hyper_red', 'far_red']
#     list_editable = ['phase_control', 'automatic', 'uvb', 'uvc', 'deep_blue', 'main', 'hyper_red', 'far_red']
