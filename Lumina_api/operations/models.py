from django.db import models
from upload_file.models import UploadFile


# 企业表
class Company(models.Model):
    name = models.CharField(max_length=64, verbose_name='企业名称')
    address = models.CharField(max_length=256, verbose_name='企业地址')
    legal_rep = models.CharField(max_length=8, verbose_name='企业法人')
    tel = models.CharField(max_length=14, verbose_name='联系电话')
    email = models.CharField(max_length=64, verbose_name='企业邮箱')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'company'
        verbose_name = '企业管理'

    def __str__(self):
        return f'{self.name}'


# 区域表
class Zone(models.Model):
    name = models.CharField(max_length=64, verbose_name='区域名称')
    company = models.ForeignKey(
        to=Company, to_field='id', on_delete=models.CASCADE, related_name='zones', verbose_name='所属企业'
    )
    status = models.IntegerField(choices=((0, '禁用'), (1, '正常')), verbose_name='区域状态', default=1)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    time_zone = models.CharField(max_length=32, verbose_name='时区码')

    class Meta:
        db_table = 'zone'
        verbose_name = '区域管理'

    def __str__(self):
        return f'{self.name}'


# 房间表
class Room(models.Model):
    serial_number = models.CharField(max_length=512, verbose_name='房间编号')
    zone = models.ForeignKey(
        to=Zone, to_field='id', on_delete=models.CASCADE, related_name='rooms', verbose_name='所属区域'
    )
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'room'
        verbose_name = '房间管理'

    def __str__(self):
        return f'{self.serial_number}'


# 机器表
class Unit(models.Model):
    serial_number = models.CharField(max_length=512, verbose_name='机器编号')
    deviceId = models.CharField(max_length=512, verbose_name='设备编号')
    deviceSecret = models.CharField(max_length=512, verbose_name='设备密钥')
    room = models.ForeignKey(
        to=Room, to_field='id', on_delete=models.CASCADE, related_name='units', verbose_name='所属房间'
    )
    status = models.IntegerField(choices=((0, '禁用'), (1, '正常')), verbose_name='机器状态', default=1)
    components = models.JSONField(null=True, blank=True, verbose_name='安卓端显示组件列表')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'unit'
        verbose_name = '机器管理'

    def __str__(self):
        return f'{self.serial_number}-{self.deviceId}'


# 房间详情传感器-业务系统第二期已弃用该表，暂保留该实体表
class RoomDesc(models.Model):
    room = models.OneToOneField(to=Room, to_field='id', on_delete=models.CASCADE, verbose_name='所属房间')
    json_val = models.JSONField(verbose_name='房间时刻详情')

    class Meta:
        db_table = 'room_desc'
        verbose_name = '房间详情'

    def __str__(self):
        return self.room.serial_number


# 温度传感器
class Temperature(models.Model):
    """
    温度的 就是  字段就是 deviceId，deviceSecret ，val就可以了
    "thermal_reading": [19.5, 20.3, 20.7, 23.1, ...]
    """
    moment = models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')
    deviceId = models.CharField(max_length=512, verbose_name='机器实体编号')
    deviceSecret = models.CharField(max_length=512, verbose_name='机器实体编号2')
    json_val = models.JSONField(verbose_name='传感器温度值(json列表串)')

    class Meta:
        db_table = 'temperature'
        verbose_name = '温度传感器'

    def __str__(self):
        return self.deviceId


# 水肥传感器
class Fertilizer(models.Model):
    """
    水肥系统的字段 deviceId，deviceSecret， val
    val 的格式就是  {"Lighting":{"xxx":"xxx","xxx","xxx"},"Irrigation":{"xx":"xx","xx","xx"}}
    """
    moment = models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')
    deviceId = models.CharField(max_length=512, verbose_name='机器实体编号')
    deviceSecret = models.CharField(max_length=512, verbose_name='机器实体编号2')
    json_val = models.JSONField(verbose_name='传感器值(json字典串)')

    class Meta:
        db_table = 'fertilizer'
        verbose_name = '水肥传感器'

    def __str__(self):
        return self.deviceId


# 光照传感器
class Lighting(models.Model):
    """
    {"Lighting":{"key":"value","key":"value"},"Irrigation":{"key":"value"}}
    """
    moment = models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')
    deviceId = models.CharField(max_length=512, verbose_name='机器实体编号')
    deviceSecret = models.CharField(max_length=512, verbose_name='机器实体编号2')
    json_val = models.JSONField(verbose_name='传感器值(json字典串)')

    class Meta:
        db_table = 'lighting'
        verbose_name = '光照传感器'

    def __str__(self):
        return self.deviceId


# 作物&算法
class Plant(models.Model):
    type = models.CharField(max_length=8, verbose_name='算法类型')
    name_en = models.CharField(max_length=32, verbose_name='英文名')
    name_cn = models.CharField(max_length=32, verbose_name='中文名')
    desc_en = models.TextField(verbose_name='英文描述')
    desc_cn = models.TextField(verbose_name='中文描述')
    status = models.IntegerField(choices=((0, '禁用'), (1, '正常')), verbose_name='作物状态', default=1)
    icon_path = models.OneToOneField(to=UploadFile, to_field='id', on_delete=models.CASCADE, verbose_name='作物图片')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'plant'
        verbose_name = '作物算法'

    def __str__(self):
        return self.name_cn


# 作物详情
class PlantDesc(models.Model):
    unit = models.ForeignKey(to=Unit, to_field='id', related_name='plant_desc', on_delete=models.CASCADE,
                             verbose_name='所属机器')
    plant = models.ForeignKey(to=Plant, to_field='id', related_name='desc', on_delete=models.CASCADE,
                              verbose_name='作物信息')
    cycle = models.IntegerField(default=1, verbose_name='作物周期')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='播种时间')

    class Meta:
        db_table = 'plant_desc'
        verbose_name = '作物详情'

    def __str__(self):
        return self.plant.name_cn


class AndroidSettings(models.Model):
    phase_control = models.JSONField(verbose_name='Phase Control')
    automatic = models.IntegerField(default=50)
    uvb = models.IntegerField(default=50)
    uvc = models.BooleanField(default=True)
    deep_blue = models.IntegerField(default=50)
    main = models.IntegerField(default=50)
    hyper_red = models.IntegerField(default=50)
    far_red = models.IntegerField(default=50)

    class Meta:
        db_table = 'android_settings'
        verbose_name = '参数设置'
