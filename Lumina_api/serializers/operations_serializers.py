from rest_framework import serializers
from operations.models import Company, Room, Zone, Unit


class ZoneSer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=64)
    company = serializers.SlugRelatedField(slug_field='id', queryset=Company, write_only=True)
    company_name = serializers.CharField(read_only=True, source='company.name')
    status = serializers.IntegerField(write_only=True)
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    time_zone = serializers.CharField(max_length=32)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Zone
        fields = '__all__'


class RoomSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(max_length=512)
    zone = serializers.SlugRelatedField(slug_field='id', queryset=Zone.objects, write_only=True)
    zone_name = serializers.CharField(source='zone.name', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Room
        fields = '__all__'


class UnitSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(max_length=512)
    room = serializers.SlugRelatedField(slug_field='id', queryset=Room.objects, write_only=True)
    room_number = serializers.CharField(source='room.serial_number', read_only=True)
    status = serializers.IntegerField(write_only=True)
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Unit
        fields = '__all__'


class ChoicesZoneSer(serializers.ModelSerializer):

    class Meta:
        model = Zone
        fields = ['id', 'name', 'time_zone']
