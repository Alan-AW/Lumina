# Generated by Django 3.2.23 on 2024-01-12 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_permission_index'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logs',
            name='command',
            field=models.IntegerField(choices=[(1, 'login'), (2, 'create'), (3, 'update'), (4, 'delete'), (5, 'put_mq')], verbose_name='指令类型'),
        ),
    ]
