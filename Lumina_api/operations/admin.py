from django.contrib import admin
from operations.models import Company, Zone, Room, Unit, Sensor, Plant


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'address', 'legal_rep', 'tel', 'email', 'account', 'create_time', 'update_time']
    list_editable = ['name', 'address', 'legal_rep', 'tel', 'email', 'account']
    search_fields = ['name', 'address', 'tel', 'email', 'legal_rep']


@admin.register(Zone)
class ZoneAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'company', 'status', 'create_time', 'update_time', 'time_zone']
    list_editable = ['name', 'company', 'status', 'time_zone']
    search_fields = ['name', 'company']


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'serial_number', 'zone', 'create_time', 'update_time']
    list_editable = ['serial_number', 'zone']
    search_fields = ['serial_number']


@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ['id', 'serial_number', 'room', 'status', 'create_time', 'update_time']
    list_editable = ['serial_number', 'room', 'status']
    search_fields = ['serial_number']


@admin.register(Sensor)
class SensorAdmin(admin.ModelAdmin):
    list_display = ['id', 'moment', 'json_val', 'room']
    list_editable = ['room']


@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    list_display = ['id', 'type', 'name_en', 'name_cn', 'desc_en', 'desc_cn', 'status', 'icon_path', 'create_time', 'update_time']
    list_editable = ['type', 'name_en', 'name_cn', 'desc_en', 'desc_cn', 'status', 'icon_path']
    search_fields = ['type', 'name_en', 'name_cn']
