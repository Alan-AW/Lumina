# Generated by Django 3.2.23 on 2024-01-04 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='permission',
            name='index',
            field=models.IntegerField(blank=True, null=True, verbose_name='菜单权限排序'),
        ),
    ]
