# Generated by Django 5.0.6 on 2024-06-23 06:08

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("meals", "0015_remove_food_custom_remove_food_food_type_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="food",
            name="cal",
            field=models.FloatField(
                default=0, validators=[django.core.validators.MinValueValidator(0)]
            ),
        ),
    ]
