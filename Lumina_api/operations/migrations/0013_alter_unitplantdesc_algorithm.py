# Generated by Django 3.2.23 on 2024-02-08 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0012_cultivar_cycle'),
    ]

    operations = [
        migrations.AlterField(
            model_name='unitplantdesc',
            name='algorithm',
            field=models.JSONField(blank=True, default=list, verbose_name='算法指令集'),
        ),
    ]
