# Generated by Django 4.0.2 on 2023-09-08 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0009_action_cultivars_environmentaloptions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phases',
            name='ending_condition',
            field=models.CharField(default='any', max_length=16, verbose_name='任何或所有'),
        ),
        migrations.AlterField(
            model_name='triggers',
            name='direction',
            field=models.IntegerField(blank=True, choices=[(1, 'increasing'), (2, 'decreasing'), (3, 'maintaining')], default=1, null=True),
        ),
    ]
