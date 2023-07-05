from rest_framework import serializers
from operations.models import Company, Room, Zone, Unit


class ZoneSer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=64)
    # company = serializers.SlugRelatedField(slug_field='id', queryset=Company, write_only=True)
    # company_name = serializers.CharField(read_only=True, source='company.name')
    status = serializers.IntegerField()
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    time_zone = serializers.CharField(max_length=32)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Zone
        exclude = ['company']
        # fields = '__all__'


class RoomSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(max_length=512)
    zone = serializers.SlugRelatedField(slug_field='id', queryset=Zone.objects)
    zone_name = serializers.CharField(source='zone.name', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Room
        fields = '__all__'


class UnitSer(serializers.ModelSerializer):
    serial_number = serializers.CharField(max_length=512)
    room = serializers.SlugRelatedField(slug_field='id', queryset=Room.objects)
    room_number = serializers.CharField(source='room.serial_number', read_only=True)
    status = serializers.IntegerField()
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    update_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Unit
        fields = '__all__'


# 双端选择区域
class ChoicesZoneSer(serializers.ModelSerializer):
    label = serializers.CharField(source='name', read_only=True)
    value = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Zone
        fields = ['id', 'name', 'time_zone', 'label', 'value']


# web端选择房间
class ChoicesRoomSer(serializers.ModelSerializer):
    label = serializers.CharField(source='serial_number', read_only=True)
    value = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Room
        fields = ['label', 'value']


# web端选择机器
class ChoicesUnitSer(serializers.ModelSerializer):
    label = serializers.CharField(source='serial_number', read_only=True)
    value = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Unit
        fields = ['label', 'value']


# 第一期为安卓APP统一返回区域内的所有数据
class RoomDeepSer(serializers.ModelSerializer):
    units = UnitSer(many=True)

    class Meta:
        model = Unit
        fields = ['id', 'serial_number', 'units']


class ZoneDeepSer(serializers.ModelSerializer):
    rooms = RoomDeepSer(many=True)

    class Meta:
        model = Zone
        fields = ['id', 'name', 'status', 'time_zone', 'rooms']
