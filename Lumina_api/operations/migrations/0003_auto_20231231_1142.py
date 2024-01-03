# Generated by Django 3.2.23 on 2023-12-31 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0002_auto_20231231_1140'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='address',
            field=models.CharField(max_length=255, unique=True, verbose_name='企业地址'),
        ),
        migrations.AlterField(
            model_name='room',
            name='serial_number',
            field=models.CharField(max_length=255, unique=True, verbose_name='房间编号'),
        ),
        migrations.AlterField(
            model_name='unit',
            name='deviceId',
            field=models.CharField(max_length=255, unique=True, verbose_name='设备编号'),
        ),
        migrations.AlterField(
            model_name='unit',
            name='deviceSecret',
            field=models.CharField(max_length=255, unique=True, verbose_name='设备密钥'),
        ),
        migrations.AlterField(
            model_name='unit',
            name='serial_number',
            field=models.CharField(max_length=255, unique=True, verbose_name='机器编号'),
        ),
    ]
