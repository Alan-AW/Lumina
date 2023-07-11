# Generated by Django 4.0.2 on 2023-07-11 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0006_alter_unit_components'),
    ]

    operations = [
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
        migrations.AlterField(
            model_name='unit',
            name='deviceId',
            field=models.CharField(max_length=512, verbose_name='设备编号'),
        ),
        migrations.AlterField(
            model_name='unit',
            name='deviceSecret',
            field=models.CharField(max_length=512, verbose_name='设备密钥'),
        ),
    ]
