# Generated by Django 3.2.23 on 2024-04-18 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0018_company_allow_cultivars'),
    ]

    operations = [
        migrations.AddField(
            model_name='unitplantdesc',
            name='status',
            field=models.BooleanField(default=True, verbose_name='周期状态'),
        ),
    ]