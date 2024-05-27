from django.db import models
from accounts.models import Account
from django.core.validators import MinValueValidator
from datetime import datetime, date
from django.core.exceptions import ValidationError

class DynamicDetail(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    date = models.DateField()
    weight = models.FloatField(validators=[MinValueValidator(1)], null=True, blank=True)
    body_fat = models.FloatField(validators=[MinValueValidator(1)], null=True, blank=True)

    class Meta:
        unique_together = ('account', 'date')
        ordering = ['-date']

    def __str__(self):
        return f"DynamicDetail for {self.account.username} on {self.date}"

class StaticDetail(models.Model):
    GENDER_CHOICES = [
        ('male', 'male'),
        ('female', 'female'),
    ]
    ACTIVE_LEVEL_CHOICES = [
        ('low', 'low'),
        ('middle', 'middle'),
        ('high', 'high'),
    ]
    
    account = models.OneToOneField(Account, on_delete=models.CASCADE, unique=True)
    tall = models.FloatField(validators=[MinValueValidator(1)],null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    sex = models.CharField(max_length=6, choices=GENDER_CHOICES, null=True, blank=True)
    bmr = models.FloatField(validators=[MinValueValidator(1)],null=True, blank=True)
    active_level = models.CharField(max_length=6, choices=ACTIVE_LEVEL_CHOICES,default="low")

    def clean(self):
        if self.birthday and self.birthday > date.today():
            raise ValidationError({'birthday': "Birthday cannot be in the future."})

    def save(self, *args, **kwargs):
        if self.bmr is None:
            # Default values
            default_tall = 160
            default_age = 25
            default_sex = 'female'
            default_weight = 50

            # Get age
            if self.birthday:
                today = datetime.today().date()
                age = today.year - self.birthday.year - ((today.month, today.day) < (self.birthday.month, self.birthday.day))
            else:
                age = default_age

            # Get tall
            tall = self.tall if self.tall is not None else default_tall

            # Get sex
            sex = self.sex if self.sex is not None else default_sex

            # Get weight
            try:
                dynamic_detail = DynamicDetail.objects.filter(account=self.account).exclude(weight=None).latest('date')
                weight = dynamic_detail.weight
            except DynamicDetail.DoesNotExist:
                weight = default_weight

            # Calculate BMR by "Mifflin-St Jeor"
            if sex == 'female':
                self.bmr = 10 * weight + 6.25 * tall - 5 * age - 161
            else:
                self.bmr = 10 * weight + 6.25 * tall - 5 * age + 5
            # Ensure BMR is not negative
            if self.bmr < 1:
                self.bmr = 1
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"StaticDetail for {self.account.username}"

class GoalDetail(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE, unique=True)
    goal_weight = models.FloatField(validators=[MinValueValidator(1)],null=True, blank=True)
    goal_body_fat = models.FloatField(validators=[MinValueValidator(1)],null=True, blank=True)
    goal_consume_cal = models.FloatField(validators=[MinValueValidator(1)],null=True, blank=True)
    goal_intake_cal = models.FloatField(validators=[MinValueValidator(1)],null=True, blank=True)

    def __str__(self):
        return f"GoalDetail for {self.account.username}"