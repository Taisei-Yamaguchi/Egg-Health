from django.db import models
from accounts.models import Account
from user_details.models import DynamicDetail
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator

# Workout Model
class Workout(models.Model):
    WORKOUT_TYPES = [
        ('Daily Living Activities', 'Daily Living Activities'),
        ('Cardio', 'Cardio'),
        ('Walking・Running', 'Walking・Running'),
        ('Strength Training', 'Strength Training'),
        ('Fitness', 'Fitness'),
        ('Ball Sports', 'Ball Sports'),
        ('Martial Arts', 'Martial Arts'),
        ('Water and Winter Sports', 'Water and Winter Sports'),
        ('Other', 'Other'),
    ]
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE, null=True,blank=True)
    name = models.CharField(max_length=100)
    ja_name = models.CharField(max_length=100, null = True, blank=True)
    type = models.CharField(max_length=50, choices=WORKOUT_TYPES, default='Other')
    mets = models.FloatField(validators=[MinValueValidator(1)],default=1)
    custom =models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        if not self.ja_name:
            self.ja_name = self.name
        super().save(*args, **kwargs)
    
    def __str__(self):
        username = self.account.username if self.account else "null"
        return f"Workout {self.id} ({self.name}) on {username}"
    
# Exercise Model
class Exercise(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    mins = models.FloatField(validators=[MinValueValidator(1)],default=1)
    consume_cal = models.FloatField(validators=[MinValueValidator(1)],default=1)
    date = models.DateField()
    
    def clean(self):
        # Check if the workout is custom and if the accounts match
        if self.workout.custom and self.account != self.workout.account:
            raise ValidationError("You cannot use custom workout items that do not belong to your account.")
    def save(self, *args, **kwargs):
        weight = 60 # defautl weight
        # Find the latest DynamicDetail entry for the account with a non-null weight
        latest_dynamic_detail = DynamicDetail.objects.filter(
            account=self.account,
            weight__isnull=False
        ).order_by('-date').first()

        # Update weight if a valid DynamicDetail entry is found
        if latest_dynamic_detail and latest_dynamic_detail.weight:
            weight = latest_dynamic_detail.weight
        
        self.consume_cal = 1.05 * weight * self.mins/60 * self.workout.mets
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Exercise {self.id} ({self.account.username}) on {self.date} ---{self.workout.name}"

class WorkoutOften(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('account', 'workout')
    def clean(self):
        if not self.account or not self.workout:
            raise ValidationError("Account and Workout are both required.")
        # Check if the workout is custom and if the accounts match
        if self.workout.custom and self.account != self.workout.account:
            raise ValidationError("You cannot use custom workout items that do not belong to your account.")
    def __str__(self):
        return f"WorkoutOften ({self.account.username} - {self.workout.name})"

class ExerciseSet(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.id}-ExerciseSet {self.name} ({self.account.username})"

class ExercisePre(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    exercise_set = models.ForeignKey(ExerciseSet, related_name='exercise_pres', on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    mins = models.FloatField(validators=[MinValueValidator(1)],default=1)
    
    def clean(self):
        # Check if the workout is custom and if the accounts match
        if self.workout.custom and self.account != self.workout.account:
            raise ValidationError("You cannot use custom workout items that do not belong to your account.")
        if self.exercise_set.account != self.account:
            raise ValidationError("You cannot use exercise sets that do not belong to your account.")
        
    def __str__(self):
        return f"ExercisePre {self.id}- {self.account.username} ({self.exercise_set.name})"