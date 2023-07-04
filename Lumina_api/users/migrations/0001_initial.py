# Generated by Django 4.0 on 2023-07-04 00:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Permission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=32, verbose_name='权限名称')),
                ('url', models.CharField(max_length=128, verbose_name='url')),
                ('isNaviLink', models.BooleanField(default=True, verbose_name='是否是菜单')),
                ('create_time', models.DateTimeField(auto_now_add=True, null=True, verbose_name='注册时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('pid', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='users.permission', verbose_name='上级权限')),
            ],
            options={
                'verbose_name': '权限表',
                'db_table': 'permission',
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
                'db_table': 'roles',
            },
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account', models.CharField(max_length=32, unique=True, verbose_name='账号')),
                ('password', models.CharField(max_length=64, verbose_name='密码')),
                ('first_name', models.CharField(max_length=32, verbose_name='名')),
                ('last_name', models.CharField(max_length=32, verbose_name='姓')),
                ('status', models.IntegerField(choices=[(0, '禁用'), (1, '正常')], default=1, verbose_name='账户状态')),
                ('create_time', models.DateTimeField(auto_now_add=True, null=True, verbose_name='注册时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('role', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='users.roles', verbose_name='所有角色')),
            ],
            options={
                'verbose_name': '用户表',
                'db_table': 'users',
            },
        ),
        migrations.CreateModel(
            name='UserAvatar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='users/avatar/%Y/%m/%d', verbose_name='用户头像')),
                ('qr_code', models.ImageField(blank=True, null=True, upload_to='users/qr_code/%Y/%m/%d', verbose_name='用户二维码')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='avatar', to='users.userinfo', verbose_name='用户对象')),
            ],
            options={
                'verbose_name': '用户头像',
                'db_table': 'user_avatar',
            },
        ),
    ]