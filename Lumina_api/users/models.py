from django.db import models
from operations.models import Company


# 权限信息
class Permission(models.Model):
    title = models.CharField(verbose_name='权限名称', max_length=32)
    url = models.CharField(verbose_name='url', max_length=128)
    isNaviLink = models.BooleanField(verbose_name='菜单', default=True)
    index = models.IntegerField(null=True, blank=True, verbose_name='菜单权限排序')
    create_time = models.DateTimeField(auto_now_add=True, null=True, verbose_name='注册时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    pid = models.ForeignKey(
        'self', verbose_name='上级权限', null=True, blank=True, on_delete=models.CASCADE, related_name='children'
    )

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'permission'
        verbose_name = '权限表'
        verbose_name_plural = verbose_name
        ordering = ['-id']


# 角色信息
class Roles(models.Model):
    title = models.CharField(verbose_name='角色名称', max_length=32)
    permission = models.ManyToManyField(verbose_name='拥有的权限', to=Permission, blank=True)
    create_time = models.DateTimeField(auto_now_add=True, null=True, verbose_name='注册时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'roles'
        verbose_name = '角色表'
        verbose_name_plural = verbose_name
        ordering = ['-id']


# 用户信息
class UserInfo(models.Model):
    account = models.CharField(verbose_name='账号', max_length=32, unique=True)
    password = models.CharField(verbose_name='密码', max_length=64)
    is_super = models.BooleanField(default=False, verbose_name='超级管理员')
    first_name = models.CharField(verbose_name='名', max_length=32)
    last_name = models.CharField(verbose_name='姓', max_length=32)
    role = models.ForeignKey(verbose_name='所有角色', to=Roles, blank=True, on_delete=models.CASCADE)
    status = models.IntegerField(verbose_name='账户状态', choices=((0, '禁用'), (1, '正常')), default=1)
    qrcode = models.CharField(max_length=256, verbose_name='用户二维码内容', null=True, blank=True)
    language = models.IntegerField(default=1, choices=((1, '中文'), (0, 'English')), verbose_name='cn/en')
    company = models.ForeignKey(
        to=Company, to_field='id', on_delete=models.CASCADE, related_name='account',
        null=True, blank=True, verbose_name='所属企业'
    )
    create_time = models.DateTimeField(auto_now_add=True, null=True, verbose_name='注册时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    def __str__(self):
        return self.account

    class Meta:
        db_table = 'users'
        verbose_name = '用户表'
        verbose_name_plural = verbose_name
        ordering = ['-id']


# 用户二维码
class UserQrcodeImg(models.Model):
    user = models.OneToOneField(
        to=UserInfo, to_field='id', related_name='qr', on_delete=models.CASCADE, verbose_name='用户对象'
    )
    qrcode = models.ImageField(upload_to='users/qrcode', blank=True, null=True, verbose_name='用户二维码')

    def __str__(self):
        return self.user.account

    class Meta:
        db_table = 'user_qrcode_img'
        verbose_name = '用户二维码'
        verbose_name_plural = verbose_name
        ordering = ['-id']


# 日志
class Logs(models.Model):
    username = models.CharField(max_length=32, verbose_name='用户')
    role = models.CharField(max_length=32, verbose_name='角色')
    table_name = models.CharField(max_length=32, verbose_name='表名')
    command = models.IntegerField(
        choices=((1, 'login'), (2, 'create'), (3, 'update'), (4, 'delete'), (5, 'put_mq')), verbose_name='指令类型'
    )
    content = models.JSONField(default=None, null=True, blank=True, verbose_name='日志内容')
    create_time = models.DateTimeField(auto_now_add=True, null=True, verbose_name='操作时间')

    def __str__(self):
        return self.get_command_display()

    class Meta:
        db_table = 'logs'
        verbose_name = '日志表'
        verbose_name_plural = verbose_name
        ordering = ['-id']
