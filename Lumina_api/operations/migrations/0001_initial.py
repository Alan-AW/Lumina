# Generated by Django 3.2.23 on 2024-01-03 07:17

from django.db import migrations, models
import django.db.models.deletion
import operations.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AndroidSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phase_control', models.JSONField(verbose_name='Phase Control')),
                ('automatic', models.IntegerField(default=50)),
                ('uvb', models.IntegerField(default=50)),
                ('uvc', models.BooleanField(default=True)),
                ('deep_blue', models.IntegerField(default=50)),
                ('main', models.IntegerField(default=50)),
                ('hyper_red', models.IntegerField(default=50)),
                ('far_red', models.IntegerField(default=50)),
            ],
            options={
                'verbose_name': '参数设置',
                'db_table': 'android_settings',
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, unique=True, verbose_name='企业名称')),
                ('address', models.CharField(max_length=255, unique=True, verbose_name='企业地址')),
                ('legal_rep', models.CharField(max_length=8, verbose_name='企业法人')),
                ('tel', models.CharField(max_length=14, verbose_name='联系电话')),
                ('email', models.CharField(max_length=64, verbose_name='企业邮箱')),
                ('logo', models.ImageField(blank=True, null=True, upload_to=operations.models.Company.logo_upload_path, verbose_name='企业logo')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '企业管理',
                'db_table': 'company',
            },
        ),
        migrations.CreateModel(
            name='Cultivars',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_en', models.CharField(max_length=64, verbose_name='英文名')),
                ('name_cn', models.CharField(max_length=64, verbose_name='中文名')),
                ('description_en', models.CharField(max_length=64, verbose_name='英文描述')),
                ('description_cn', models.CharField(max_length=64, verbose_name='中文描述')),
            ],
            options={
                'verbose_name': '第一层cultivars',
                'db_table': 'cultivars',
            },
        ),
        migrations.CreateModel(
            name='EnvironmentalOptions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=64, verbose_name='key')),
                ('value', models.CharField(max_length=64, unique=True, verbose_name='value')),
            ],
            options={
                'verbose_name': 'options',
                'db_table': 'environmental_options',
            },
        ),
        migrations.CreateModel(
            name='Fertilizer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('moment', models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')),
                ('deviceId', models.CharField(max_length=512, verbose_name='机器实体编号')),
                ('deviceSecret', models.CharField(max_length=512, verbose_name='机器实体编号2')),
                ('json_val', models.JSONField(verbose_name='传感器值(json字典串)')),
            ],
            options={
                'verbose_name': '水肥传感器',
                'db_table': 'fertilizer',
            },
        ),
        migrations.CreateModel(
            name='HardwareOptions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=64, verbose_name='key')),
                ('value', models.CharField(max_length=64, verbose_name='value')),
            ],
            options={
                'verbose_name': 'options',
                'db_table': 'hardware_options',
            },
        ),
        migrations.CreateModel(
            name='Lighting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('moment', models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')),
                ('deviceId', models.CharField(max_length=512, verbose_name='机器实体编号')),
                ('deviceSecret', models.CharField(max_length=512, verbose_name='机器实体编号2')),
                ('json_val', models.JSONField(verbose_name='传感器值(json字典串)')),
            ],
            options={
                'verbose_name': '光照传感器',
                'db_table': 'lighting',
            },
        ),
        migrations.CreateModel(
            name='Models',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_en', models.CharField(max_length=64, verbose_name='英文名')),
                ('name_cn', models.CharField(max_length=64, verbose_name='中文名')),
                ('description_en', models.CharField(max_length=64, verbose_name='英文描述')),
                ('description_cn', models.CharField(max_length=64, verbose_name='中文描述')),
                ('available_grow_objectives', models.JSONField(default=list, null=True)),
                ('available_grow_techniques', models.JSONField(default=list, null=True)),
                ('cultivars', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='models', to='operations.cultivars', verbose_name='所属上层')),
            ],
            options={
                'verbose_name': '第二层models',
                'db_table': 'models',
            },
        ),
        migrations.CreateModel(
            name='Phases',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phase_index', models.IntegerField(default=0)),
                ('name_en', models.CharField(max_length=64, verbose_name='英文名')),
                ('name_cn', models.CharField(max_length=64, verbose_name='中文名')),
                ('description_en', models.CharField(max_length=64, verbose_name='英文描述')),
                ('description_cn', models.CharField(max_length=64, verbose_name='中文描述')),
                ('scheduled_events', models.JSONField(blank=True, default=list, null=True)),
                ('ending_condition', models.CharField(default='any', max_length=16, verbose_name='任何或所有')),
                ('ending_triggers', models.JSONField(blank=True, default=list, null=True)),
                ('f_model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phases', to='operations.models', verbose_name='所属上层')),
            ],
            options={
                'verbose_name': '第三层phases',
                'db_table': 'phases',
            },
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
                ('status', models.IntegerField(choices=[(0, '禁用'), (1, '正常')], default=1, verbose_name='作物状态')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '作物算法',
                'db_table': 'plant',
            },
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serial_number', models.CharField(max_length=255, unique=True, verbose_name='房间编号')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rooms', to='operations.company', verbose_name='所属公司')),
            ],
            options={
                'verbose_name': '房间管理',
                'db_table': 'room',
            },
        ),
        migrations.CreateModel(
            name='Species',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_en', models.CharField(max_length=64, verbose_name='英文名')),
                ('name_cn', models.CharField(max_length=64, verbose_name='中文名')),
                ('description_en', models.CharField(max_length=64, verbose_name='英文描述')),
                ('description_cn', models.CharField(max_length=64, verbose_name='中文描述')),
            ],
            options={
                'verbose_name': '顶层species',
                'db_table': 'species',
            },
        ),
        migrations.CreateModel(
            name='Temperature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('moment', models.DateTimeField(auto_now_add=True, verbose_name='检测时刻')),
                ('deviceId', models.CharField(max_length=512, verbose_name='机器实体编号')),
                ('deviceSecret', models.CharField(max_length=512, verbose_name='机器实体编号2')),
                ('json_val', models.JSONField(verbose_name='传感器温度值(json列表串)')),
            ],
            options={
                'verbose_name': '温度传感器',
                'db_table': 'temperature',
            },
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serial_number', models.CharField(max_length=255, unique=True, verbose_name='机器编号')),
                ('deviceId', models.CharField(max_length=255, unique=True, verbose_name='设备编号')),
                ('deviceSecret', models.CharField(max_length=255, unique=True, verbose_name='设备密钥')),
                ('status', models.IntegerField(choices=[(0, '禁用'), (1, '正常')], default=1, verbose_name='机器状态')),
                ('components', models.JSONField(blank=True, null=True, verbose_name='安卓端显示组件列表')),
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
            name='Triggers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_en', models.CharField(max_length=64, verbose_name='英文名')),
                ('name_cn', models.CharField(max_length=64, verbose_name='中文名')),
                ('status', models.CharField(default='active', max_length=64)),
                ('triggered', models.BooleanField(default=False, verbose_name='布尔值')),
                ('type', models.CharField(default='exception', max_length=64)),
                ('operator', models.CharField(default='greater_than', max_length=64)),
                ('threshold', models.IntegerField(default=20)),
                ('direction', models.CharField(blank=True, max_length=64, null=True)),
                ('timeframe', models.TimeField(blank=True, default=None, null=True)),
                ('toi', models.TimeField(blank=True, default=None, null=True)),
                ('metric', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='operations.environmentaloptions', to_field='value')),
                ('phases', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='triggers', to='operations.phases', verbose_name='所属上级')),
            ],
            options={
                'verbose_name': '第六层triggers',
                'db_table': 'triggers',
            },
        ),
        migrations.CreateModel(
            name='RoomDesc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('json_val', models.JSONField(verbose_name='房间时刻详情')),
                ('room', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='operations.room', verbose_name='所属房间')),
            ],
            options={
                'verbose_name': '房间详情',
                'db_table': 'room_desc',
            },
        ),
        migrations.CreateModel(
            name='PlantDesc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icon_path', models.CharField(max_length=512, verbose_name='作物图片')),
                ('cycle', models.IntegerField(default=1, verbose_name='作物周期')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='播种时间')),
                ('plant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='desc', to='operations.plant', verbose_name='作物信息')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plant_desc', to='operations.unit', verbose_name='所属机器')),
            ],
            options={
                'verbose_name': '作物详情',
                'db_table': 'plant_desc',
            },
        ),
        migrations.CreateModel(
            name='Instruction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(default='active', max_length=64)),
                ('type', models.CharField(default='timed', max_length=64)),
                ('n_weeks', models.IntegerField(blank=True, null=True, verbose_name='每隔n周')),
                ('dow', models.JSONField(blank=True, default=list, null=True, verbose_name='事件发生在一周中的哪一天[]')),
                ('tod', models.TimeField(blank=True, null=True)),
                ('interval', models.TimeField(blank=True, null=True)),
                ('duration', models.TimeField(blank=True, null=True)),
                ('phases', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='base', to='operations.phases', verbose_name='所属上层')),
            ],
            options={
                'verbose_name': '第四层instruction',
                'db_table': 'instruction',
            },
        ),
        migrations.AddField(
            model_name='cultivars',
            name='species',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cultivars', to='operations.species', verbose_name='所属上层'),
        ),
        migrations.CreateModel(
            name='Action',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('snippet_type', models.CharField(default='action', max_length=64)),
                ('status', models.CharField(default='active', max_length=64)),
                ('type', models.CharField(default='no_feedback', max_length=64)),
                ('hardware', models.CharField(default='growLED', max_length=64)),
                ('environmental_factor', models.CharField(default='temperature', max_length=64)),
                ('instruction', models.CharField(default='turn_on', max_length=64)),
                ('value', models.JSONField(blank=True, default=list, null=True)),
                ('curve', models.CharField(default='linear', max_length=64)),
                ('curve_duration', models.TimeField(blank=True, default='00:30:00', null=True)),
                ('base', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='action', to='operations.instruction', verbose_name='所属上层')),
            ],
            options={
                'verbose_name': '第五层action',
                'db_table': 'action',
            },
        ),
    ]
