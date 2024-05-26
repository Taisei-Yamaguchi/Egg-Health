from django.db import models
from accounts.models import Account
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator

# Workout Model
class Workout(models.Model):
    WORKOUT_TYPES = [
        ('Living', 'Living'),
        ('Aerobic', 'Aerobic'),
        ('Walk', 'Walk'),
        ('Run', 'Run'),
        ('Muscle', 'Muscle'),
        ('Sports Club', 'Sports Club'),
        ('Martial Arts', 'Martial Arts'),
        ('Marine Winter', 'Marine Winter'),
        ('Other', 'Other'),
    ]
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE, null=True,blank=True)
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=20, choices=WORKOUT_TYPES, default='Other')
    mets = models.FloatField(validators=[MinValueValidator(1)],default=1)
    custom =models.BooleanField(default=False)
    
    def __str__(self):
        username = self.account.username if self.account else "null"
        return f"Workout {self.id} ({self.name}) on {username}"
    
# Exercise Model
class Exercise(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    mins = models.FloatField(validators=[MinValueValidator(1)],default=1)
    consumed_cal = models.FloatField(validators=[MinValueValidator(1)],default=1)
    exercise_date = models.DateField()
    
    def clean(self):
        # Check if the workout is custom and if the accounts match
        if self.workout.custom and self.account != self.workout.account:
            raise ValidationError("You cannot use custom workout items that do not belong to your account.")
    def save(self, *args, **kwargs):
        # real weight will be here
        weight = 60
        self.consumed_cal = 1.05 * weight * self.mins/60 * self.workout.mets
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Exercise {self.id} ({self.account.username}) on {self.exercise_date} ---{self.workout.name}"
