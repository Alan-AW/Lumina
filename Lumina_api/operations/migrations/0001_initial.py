# Generated by Django 4.0 on 2023-07-04 00:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('upload_file', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, verbose_name='企业名称')),
                ('address', models.CharField(max_length=256, verbose_name='企业地址')),
                ('legal_rep', models.CharField(max_length=8, verbose_name='企业法人')),
                ('tel', models.CharField(max_length=14, verbose_name='联系电话')),
                ('email', models.CharField(max_length=64, verbose_name='企业邮箱')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='company', to='users.userinfo', verbose_name='企业所属账号')),
            ],
            options={
                'verbose_name': '企业管理',
                'db_table': 'company',
            },
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serial_number', models.CharField(max_length=512, verbose_name='房间编号')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '房间管理',
                'db_table': 'room',
            },
        ),
        migrations.CreateModel(
            name='Zone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, verbose_name='区域名称')),
                ('status', models.IntegerField(choices=[(0, '禁用'), (1, '正常')], default=1, verbose_name='区域状态')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('time_zone', models.CharField(max_length=32, verbose_name='时区码')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='zones', to='operations.company', verbose_name='所属企业')),
            ],
            options={
                'verbose_name': '区域管理',
                'db_table': 'zone',
            },
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serial_number', models.CharField(max_length=512, verbose_name='机器编号')),
                ('status', models.IntegerField(choices=[(0, '禁用'), (1, '正常')], default=1, verbose_name='机器状态')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='units', to='operations.room', verbose_name='所属房间')),
            ],
            options={
                'verbose_name': '机器管理',
                'db_table': 'unit',
            },
        ),
        migrations.CreateModel(
            name='Sensor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('moment', models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')),
                ('json_val', models.JSONField(verbose_name='值描述&值')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sensors', to='operations.room', verbose_name='所属房间')),
            ],
            options={
                'verbose_name': '传感器管理',
                'db_table': 'sensor',
            },
        ),
        migrations.AddField(
            model_name='room',
            name='zone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rooms', to='operations.zone', verbose_name='所属区域'),
        ),
        migrations.CreateModel(
            name='Plant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=8, verbose_name='算法类型')),
                ('name_en', models.CharField(max_length=32, verbose_name='英文名')),
                ('name_cn', models.CharField(max_length=32, verbose_name='中文名')),
                ('desc_en', models.TextField(verbose_name='英文描述')),
                ('desc_cn', models.TextField(verbose_name='中文描述')),
                ('status', models.IntegerField(choices=[(0, '禁用'), (1, '正常')], default=1, verbose_name='区域状态')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('icon_path', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='upload_file.uploadfile', verbose_name='作物图片')),
            ],
            options={
                'verbose_name': '作物算法',
                'db_table': 'plant',
            },
        ),
    ]