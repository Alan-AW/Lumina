# Generated by Django 3.2.23 on 2024-01-03 07:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('operations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Logs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=32, verbose_name='用户')),
                ('role', models.CharField(max_length=32, verbose_name='角色')),
                ('table_name', models.CharField(max_length=32, verbose_name='表名')),
                ('command', models.IntegerField(choices=[(1, 'login'), (2, 'create'), (3, 'update'), (4, 'delete')], verbose_name='指令类型')),
                ('content', models.JSONField(blank=True, default=None, null=True, verbose_name='日志内容')),
                ('create_time', models.DateTimeField(auto_now_add=True, null=True, verbose_name='操作时间')),
            ],
            options={
                'verbose_name': '日志表',
                'verbose_name_plural': '日志表',
                'db_table': 'logs',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Permission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=32, verbose_name='权限名称')),
                ('url', models.CharField(max_length=128, verbose_name='url')),
                ('isNaviLink', models.BooleanField(default=True, verbose_name='菜单')),
                ('create_time', models.DateTimeField(auto_now_add=True, null=True, verbose_name='注册时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('pid', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='users.permission', verbose_name='上级权限')),
            ],
            options={
                'verbose_name': '权限表',
                'verbose_name_plural': '权限表',
                'db_table': 'permission',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=32, verbose_name='角色名称')),
                ('create_time', models.DateTimeField(auto_now_add=True, null=True, verbose_name='注册时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('permission', models.ManyToManyField(blank=True, to='users.Permission', verbose_name='拥有的权限')),
            ],
            options={
                'verbose_name': '角色表',
                'verbose_name_plural': '角色表',
                'db_table': 'roles',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account', models.CharField(max_length=32, unique=True, verbose_name='账号')),
                ('password', models.CharField(max_length=64, verbose_name='密码')),
                ('is_super', models.BooleanField(default=False, verbose_name='超级管理员')),
                ('first_name', models.CharField(max_length=32, verbose_name='名')),
                ('last_name', models.CharField(max_length=32, verbose_name='姓')),
                ('status', models.IntegerField(choices=[(0, '禁用'), (1, '正常')], default=1, verbose_name='账户状态')),
                ('qrcode', models.CharField(blank=True, max_length=256, null=True, verbose_name='用户二维码内容')),
                ('language', models.IntegerField(choices=[(1, '中文'), (0, 'English')], default=1, verbose_name='cn/en')),
                ('create_time', models.DateTimeField(auto_now_add=True, null=True, verbose_name='注册时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='account', to='operations.company', verbose_name='所属企业')),
                ('role', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='users.roles', verbose_name='所有角色')),
            ],
            options={
                'verbose_name': '用户表',
                'verbose_name_plural': '用户表',
                'db_table': 'users',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='UserQrcodeImg',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qrcode', models.ImageField(blank=True, null=True, upload_to='users/qrcode', verbose_name='用户二维码')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='qr', to='users.userinfo', verbose_name='用户对象')),
            ],
            options={
                'verbose_name': '用户二维码',
                'verbose_name_plural': '用户二维码',
                'db_table': 'user_qrcode_img',
                'ordering': ['-id'],
            },
        ),
    ]