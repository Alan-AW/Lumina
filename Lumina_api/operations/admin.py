from django.contrib import admin
from operations.models import Company, Zone, Room, RoomDesc, Unit, Temperature, Plant, PlantDesc


# 企业
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'address', 'legal_rep', 'tel', 'email', 'create_time', 'update_time']
    list_editable = ['name', 'address', 'legal_rep', 'tel', 'email']
    search_fields = ['name', 'address', 'tel', 'email', 'legal_rep']


# 区域
@admin.register(Zone)
class ZoneAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'company', 'status', 'create_time', 'update_time', 'time_zone']
    list_editable = ['name', 'company', 'status', 'time_zone']
    search_fields = ['name', 'company']


# 房间
@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'serial_number', 'zone', 'create_time', 'update_time']
    list_editable = ['serial_number', 'zone']
    search_fields = ['serial_number']


# 房间详情
@admin.register(RoomDesc)
class RoomDescAdmin(admin.ModelAdmin):
    list_display = ['id', 'room', 'json_val']
    list_editable = ['room', 'json_val']


# 机器
@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ['id', 'serial_number', 'deviceId', 'deviceSecret', 'room', 'status', 'components', 'create_time',
                    'update_time']
    list_editable = ['serial_number', 'deviceId', 'deviceSecret', 'room', 'status', 'components']
    search_fields = ['serial_number']


# 温度传感器
@admin.register(Temperature)
class TemperatureAdmin(admin.ModelAdmin):
    list_display = ['id', 'moment', 'deviceId', 'deviceSecret', 'json_val']
    list_editable = ['deviceId', 'deviceSecret', 'json_val']
    search_fields = ['deviceId', 'deviceSecret']


# 水肥传感器
class FertilizerAdmin(admin.ModelAdmin):
    list_display = ['id', 'moment', 'deviceId', 'deviceSecret', 'json_val']
    list_editable = ['deviceId', 'deviceSecret', 'json_val']
    search_fields = ['deviceId', 'deviceSecret']


# 作物
@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'type', 'name_en', 'name_cn', 'desc_en', 'desc_cn', 'status', 'icon_path', 'create_time', 'update_time'
    ]
    list_editable = ['type', 'name_en', 'name_cn', 'desc_en', 'desc_cn', 'status', 'icon_path']
    search_fields = ['type', 'name_en', 'name_cn']


# 作物详情
@admin.register(PlantDesc)
class PlantDescAdmin(admin.ModelAdmin):
    list_display = ['id', 'unit', 'plant', 'cycle', 'create_time']
    list_editable = ['unit', 'plant', 'cycle']
