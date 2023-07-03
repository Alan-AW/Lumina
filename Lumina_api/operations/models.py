from django.db import models
from users.models import UserInfo
from upload_file.models import UploadFile


# 企业表
class Company(models.Model):
    name = models.CharField(max_length=64, verbose_name='企业名称')
    address = models.CharField(max_length=256, verbose_name='企业地址')
    legal_rep = models.CharField(max_length=8, verbose_name='企业法人')
    tel = models.CharField(max_length=14, verbose_name='联系电话')
    email = models.CharField(max_length=64, verbose_name='企业邮箱')
    account = models.OneToOneField(
        to=UserInfo, to_field='id', on_delete=models.CASCADE, related_name='company', verbose_name='企业所属账号'
    )
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
    room = models.ForeignKey(
        to=Room, to_field='id', on_delete=models.CASCADE, related_name='units', verbose_name='所属房间'
    )
    status = models.IntegerField(choices=((0, '禁用'), (1, '正常')), verbose_name='机器状态', default=1)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'unit'
        verbose_name = '机器管理'

    def __str__(self):
        return f'{self.serial_number}'


# 传感器
class Sensor(models.Model):
    moment = models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')
    json_val = models.JSONField(verbose_name='值描述&值')
    room = models.ForeignKey(
        to=Room, to_field='id', on_delete=models.CASCADE, related_name='sensors', verbose_name='所属房间'
    )

    class Meta:
        db_table = 'sensor'
        verbose_name = '传感器管理'

    def __str__(self):
        return


# 作物&算法
class Plant(models.Model):
    type = models.CharField(max_length=8, verbose_name='算法类型')
    name_en = models.CharField(max_length=32, verbose_name='英文名')
    name_cn = models.CharField(max_length=32, verbose_name='中文名')
    desc_en = models.TextField(verbose_name='英文描述')
    desc_cn = models.TextField(verbose_name='中文描述')
    status = models.IntegerField(choices=((0, '禁用'), (1, '正常')), verbose_name='区域状态', default=1)
    icon_path = models.OneToOneField(to=UploadFile, to_field='id', on_delete=models.CASCADE, verbose_name='作物图片')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'plant'
        verbose_name = '作物算法'

    def __str__(self):
        return f'{self.id}'
