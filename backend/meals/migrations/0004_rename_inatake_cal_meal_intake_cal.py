# Generated by Django 5.0.6 on 2024-05-26 20:58

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("meals", "0003_meal_inatake_cal_alter_food_account"),
    ]

    operations = [
        migrations.RenameField(
            model_name="meal",
            old_name="inatake_cal",
            new_name="intake_cal",
        ),
    ]