# Generated by Django 3.2.23 on 2024-02-05 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0005_auto_20240116_1410'),
    ]

    operations = [
        migrations.CreateModel(
            name='Algorithm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_cn', models.CharField(max_length=64, verbose_name='算法主题cn')),
                ('subject_en', models.CharField(max_length=64, verbose_name='算法主题en')),
                ('title_cn', models.CharField(max_length=64, verbose_name='算法标题cn')),
                ('title_en', models.CharField(max_length=64, verbose_name='算法标题en')),
                ('desc_cn', models.CharField(max_length=255, verbose_name='算法描述cn')),
                ('desc_en', models.CharField(max_length=255, verbose_name='算法描述en')),
                ('choices_cn', models.JSONField(default=list, verbose_name='算法选项cn')),
                ('choices_en', models.JSONField(default=list, verbose_name='算法选项en')),
                ('cmd', models.JSONField(default=list, verbose_name='算法指令集')),
                ('app_show', models.BooleanField(default=True, verbose_name='是否显示在APP')),
            ],
            options={
                'verbose_name': '种植品类算法',
                'db_table': 'algorithm',
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='Cultivar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icon', models.CharField(max_length=255, verbose_name='品类图标')),
                ('name_cn', models.CharField(max_length=64, verbose_name='中文名称')),
                ('name_en', models.CharField(max_length=64, verbose_name='英文名称')),
                ('desc_cn', models.CharField(max_length=255, verbose_name='中文描述')),
                ('desc_en', models.CharField(max_length=255, verbose_name='英文描述')),
                ('algorithm', models.ManyToManyField(to='operations.Algorithm', verbose_name='算法集')),
            ],
            options={
                'verbose_name': '种植品类',
                'db_table': 'cultivar',
                'ordering': ('-id',),
            },
        ),
    ]
