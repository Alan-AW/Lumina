# Generated by Django 4.2.7 on 2023-12-04 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('android', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='sendmessagetoqueue',
            options={'ordering': ['-create_time'], 'verbose_name': 'Send Message To Queue', 'verbose_name_plural': 'Send Message To Queue'},
        ),
        migrations.AlterField(
            model_name='sendmessagetoqueue',
            name='data',
            field=models.JSONField(default=dict, verbose_name='数据'),
        ),
    ]
