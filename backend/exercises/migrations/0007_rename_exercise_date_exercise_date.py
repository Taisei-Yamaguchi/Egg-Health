# Generated by Django 5.0.6 on 2024-05-28 05:49

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("exercises", "0006_rename_consumed_cal_exercise_consume_cal"),
    ]

    operations = [
        migrations.RenameField(
            model_name="exercise",
            old_name="exercise_date",
            new_name="date",
        ),
    ]
