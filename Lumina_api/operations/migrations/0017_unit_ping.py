# Generated by Django 3.2.23 on 2024-03-30 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0016_auto_20240330_2134'),
    ]

    operations = [
        migrations.AddField(
            model_name='unit',
            name='ping',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='逻辑核心上一次ping的时间'),
        ),
    ]
