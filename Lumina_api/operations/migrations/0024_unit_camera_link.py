# Generated by Django 3.2.23 on 2024-06-21 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0023_alter_unitsettingslist_cmd'),
    ]

    operations = [
        migrations.AddField(
            model_name='unit',
            name='camera_link',
            field=models.TextField(blank=True, null=True, verbose_name='摄像头链接'),
        ),
    ]