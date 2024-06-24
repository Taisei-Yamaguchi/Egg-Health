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
    two_days_ago = today - timezone.timedelta(days=2)
    logger.debug(f"2 days ago date: {two_days_ago}")
    selected_monsters = MonsterSelected.objects.all()

    for selected in selected_monsters:
        try:
            monster = Monster.objects.filter(account=selected.account, monster_type=selected.selected_monster).first()
            if not monster:
                continue

            grow_points = 0

            if Meal.objects.filter(account=selected.account, date=two_days_ago).exists():
                logger.debug(f"Meal exists for account {selected.account.id}")
                grow_points += 2

            if Exercise.objects.filter(account=selected.account, date=two_days_ago).exists():
                logger.debug(f"Exercise exists for account {selected.account.id}")
                grow_points += 2

            if DynamicDetail.objects.filter(account=selected.account, date=two_days_ago).exists():
                logger.debug(f"DynamicDetail exists for account {selected.account.id}")
                grow_points += 2

            goal = GoalDetail.objects.filter(account=selected.account).first()
            meals = Meal.objects.filter(account=selected.account, date=two_days_ago)
            exercises = Exercise.objects.filter(account=selected.account, date=two_days_ago)
            static_detail = StaticDetail.objects.filter(account=selected.account).first()

            if goal and static_detail and static_detail.bmr is not None and static_detail.other_cal is not None:
                intake_calories = sum(meal.intake_cal for meal in meals)
                consumed_calories = sum(exercise.consume_cal for exercise in exercises)
                bmr = static_detail.bmr
                other_cal = static_detail.other_cal
                
                total_consumed_calories = consumed_calories + bmr + intake_calories * 0.1 + other_cal

                if abs(goal.goal_intake_cal - intake_calories) <= 200:
                    logger.debug(f"Good intake goal for account {selected.account.id}")
                    grow_points += 4

                if total_consumed_calories >= goal.goal_consume_cal:
                    logger.debug(f"Good consume cal for account {selected.account.id}")
                    grow_points += 4

            monster.add_grow_points(grow_points)
            logger.debug(f"Added {grow_points} grow points to monster {monster.id} for account {selected.account.id}")
        except Exception as e:
            logger.error(f"An error occurred while processing account {selected.account.id}: {str(e)}")
