# Generated by Django 5.0.6 on 2024-05-27 17:58

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("exercises", "0005_alter_exercise_consumed_cal"),
    ]

    operations = [
        migrations.RenameField(
            model_name="exercise",
            old_name="consumed_cal",
            new_name="consume_cal",
        ),
    ]
