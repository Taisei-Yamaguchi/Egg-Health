# Generated by Django 5.0.6 on 2024-05-28 05:42

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("meals", "0004_rename_inatake_cal_meal_intake_cal"),
    ]

    operations = [
        migrations.RenameField(
            model_name="meal",
            old_name="meal_date",
            new_name="date",
        ),
    ]
