# Generated by Django 4.0.2 on 2023-09-09 05:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0015_alter_instruction_duration_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='action',
            name='base',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='action', to='operations.instruction', verbose_name='所属上层'),
            preserve_default=False,
        ),
    ]
