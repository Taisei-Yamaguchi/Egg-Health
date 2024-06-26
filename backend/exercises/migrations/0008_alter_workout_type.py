# Generated by Django 5.0.6 on 2024-05-29 19:10

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exercises", "0007_rename_exercise_date_exercise_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="workout",
            name="type",
            field=models.CharField(
                choices=[
                    ("Daily Living Activities", "Daily Living Activities"),
                    ("Cardio", "Cardio"),
                    ("Walk", "Walk"),
                    ("Run", "Run"),
                    ("Strength Training", "Strength Training"),
                    ("Sports Club", "Sports Club"),
                    ("Martial Arts", "Martial Arts"),
                    ("Water and Winter Sports", "Water and Winter Sports"),
                    ("Other", "Other"),
                ],
                default="Other",
                max_length=50,
            ),
        ),
    ]
