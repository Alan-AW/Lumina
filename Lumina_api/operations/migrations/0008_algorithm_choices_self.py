# Generated by Django 3.2.23 on 2024-02-08 07:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0007_unit_cultivar'),
    ]

    operations = [
        migrations.AddField(
            model_name='algorithm',
            name='choices_self',
            field=models.BooleanField(default=False, verbose_name='自定义选项,APP端用于分辨是否有子集的字段'),
        ),
    ]