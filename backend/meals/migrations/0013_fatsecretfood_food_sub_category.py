# Generated by Django 5.0.6 on 2024-06-19 13:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("meals", "0012_rename_calories_per_unit_fatsecretfood_cal_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="fatsecretfood",
            name="food_sub_category",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
