# Generated by Django 5.0.6 on 2024-05-31 11:18

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("user_details", "0004_alter_goaldetail_goal_body_fat_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="goaldetail",
            name="current_weight",
            field=models.FloatField(
                default=60, validators=[django.core.validators.MinValueValidator(1)]
            ),
        ),
        migrations.AddField(
            model_name="goaldetail",
            name="goal_type",
            field=models.CharField(
                choices=[("diet", "diet"), ("maintain", "maintain"), ("bulk", "bulk")],
                default="maintain",
                max_length=10,
            ),
        ),
        migrations.AddField(
            model_name="goaldetail",
            name="set_date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="goaldetail",
            name="target_date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="staticdetail",
            name="tdee",
            field=models.FloatField(
                blank=True,
                null=True,
                validators=[django.core.validators.MinValueValidator(1)],
            ),
        ),
        migrations.AlterField(
            model_name="goaldetail",
            name="goal_weight",
            field=models.FloatField(
                default=60, validators=[django.core.validators.MinValueValidator(1)]
            ),
        ),
        migrations.AlterField(
            model_name="staticdetail",
            name="active_level",
            field=models.CharField(
                choices=[
                    ("very low", "very low"),
                    ("low", "low"),
                    ("middle", "middle"),
                    ("high", "high"),
                    ("very high", "very high"),
                ],
                default="very low",
                max_length=10,
            ),
        ),
    ]