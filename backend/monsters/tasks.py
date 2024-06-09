# tasks.py

import logging
from celery import shared_task
from django.utils import timezone
from .models import Monster, MonsterSelected
from meals.models import Meal
from exercises.models import Exercise
from user_details.models import DynamicDetail, GoalDetail, StaticDetail

logger = logging.getLogger('monsters')

@shared_task
def calculate_grow_points():
    logger.debug("Task started: calculate_grow_points")
    today = timezone.now().date()
    yesterday = today - timezone.timedelta(days=1)
    logger.debug(f"Yesterday's date: {yesterday}")
    selected_monsters = MonsterSelected.objects.all()

    for selected in selected_monsters:
        monster = Monster.objects.filter(account=selected.account, monster_type=selected.selected_monster).first()
        if not monster:
            continue

        grow_points = 0

        if Meal.objects.filter(account=selected.account, date=yesterday).exists():
            logger.debug(f"Meal exists for account {selected.account.id}")
            grow_points += 3

        if Exercise.objects.filter(account=selected.account, date=yesterday).exists():
            logger.debug(f"Exercise exists for account {selected.account.id}")
            grow_points += 3

        if DynamicDetail.objects.filter(account=selected.account, date=yesterday).exists():
            logger.debug(f"DynamicDetail exists for account {selected.account.id}")
            grow_points += 3

        goal = GoalDetail.objects.filter(account=selected.account).first()
        meals = Meal.objects.filter(account=selected.account, date=yesterday)
        exercises = Exercise.objects.filter(account=selected.account, date=yesterday)
        static_detail = StaticDetail.objects.filter(account=selected.account).first()

        if goal and static_detail:
            intake_calories = sum(meal.intake_cal for meal in meals)
            consumed_calories = sum(exercise.consume_cal for exercise in exercises)
            bmr = static_detail.bmr
            active_level_multiplier = 1.2  # 例: sedentary = 1.2, light_active = 1.375, etc.

            total_consumed_calories = consumed_calories + bmr + intake_calories * 0.1 + bmr * active_level_multiplier

            if abs(goal.goal_intake_cal - intake_calories) <= 200:
                logger.debug(f"Good intake goal for account {selected.account.id}")
                grow_points += 4

            if total_consumed_calories >= goal.goal_consume_cal:
                logger.debug(f"Good consume cal for account {selected.account.id}")
                grow_points += 4

        monster.add_grow_points(grow_points)
        logger.debug(f"Added {grow_points} grow points to monster {monster.id} for account {selected.account.id}")
