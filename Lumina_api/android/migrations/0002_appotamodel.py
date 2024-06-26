# Generated by Django 3.2.23 on 2024-04-17 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('android', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppOtaModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version', models.CharField(max_length=64, verbose_name='版本号')),
                ('apk', models.FileField(upload_to='android/app', verbose_name='APP安装包')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='发布时间')),
            ],
            options={
                'db_table': 'android_app_ota',
                'ordering': ['-id'],
            },
        ),
    ]
