# Generated by Django 5.0.6 on 2024-06-01 00:02

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            "user_details",
            "0005_goaldetail_current_weight_goaldetail_goal_type_and_more",
        ),
    ]

    operations = [
        migrations.RemoveField(
            model_name="goaldetail",
            name="current_weight",
        ),
        migrations.AlterField(
            model_name="goaldetail",
            name="set_date",
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]