from django.db import models
from accounts.models import Account
from django.core.validators import MinValueValidator
from datetime import datetime, date
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.utils.timezone import now

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
        ('very low','very low'),
        ('low', 'low'),
        ('middle', 'middle'),
        ('high', 'high'),
        ('very high','very high')
    ]
    
    account = models.OneToOneField(Account, on_delete=models.CASCADE, unique=True)
    tall = models.FloatField(validators=[MinValueValidator(1)],null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    sex = models.CharField(max_length=6, choices=GENDER_CHOICES, null=True, blank=True)
    bmr = models.FloatField(validators=[MinValueValidator(1)],null=True, blank=True)
    active_level = models.CharField(max_length=10, choices=ACTIVE_LEVEL_CHOICES,default="very low")
    tdee = models.FloatField(validators=[MinValueValidator(1)],null=True, blank=True)
    other_cal = models.FloatField(validators=[MinValueValidator(0)], null=True, blank=True)  

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
        
        # Calculate TDEE
        active_level_multiplier = {
            'very low': 1.2,
            'low': 1.375,
            'middle': 1.55,
            'high': 1.725,
            'very high': 1.9,
        }
        self.tdee = self.bmr * active_level_multiplier.get(self.active_level, 1.2)

        # Calculate other_cal based on active_level
        active_level_multiplier_for_other = {
            'very low': 0.03,
            'low': 0.05,
            'middle': 0.07,
            'high': 0.1,
            'very high': 0.12
        }
        self.other_cal = self.bmr * active_level_multiplier_for_other.get(self.active_level, 0)

        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"StaticDetail for {self.account.username}"

class GoalDetail(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE, unique=True)
    goal_weight = models.FloatField(validators=[MinValueValidator(1)], default=60)
    goal_body_fat = models.FloatField(validators=[MinValueValidator(1)], null=True, blank=True)
    goal_consume_cal = models.FloatField(validators=[MinValueValidator(1)], null=True, blank=True)
    goal_intake_cal = models.FloatField(validators=[MinValueValidator(1)], null=True, blank=True)
    target_date = models.DateField(null=True, blank=True)
    set_date = models.DateField(default=now)
    
    GOAL_CHOICES = (
        ('diet', 'diet'),
        ('maintain', 'maintain'),
        ('bulk', 'bulk')
    )
    goal_type = models.CharField(max_length=10, choices=GOAL_CHOICES, default='maintain')

    def save(self, *args, **kwargs):
        # set_dateを常に今日の日付に設定
        self.set_date = date.today()

        # Get current weight from the latest DynamicDetail or use default if not available
        try:
            dynamic_detail = DynamicDetail.objects.filter(account=self.account).exclude(weight=None).latest('date')
            current_weight = dynamic_detail.weight
        except DynamicDetail.DoesNotExist:
            current_weight = 50

        if self.goal_intake_cal is None:
            # Calculate goal intake calories only if goal_intake_cal is not provided by the user
            # Get StaticDetail for the account
            static_detail = StaticDetail.objects.filter(account=self.account).first()

            if static_detail and static_detail.tdee is not None:
                # Calculate daily calorie reduction
                weight_difference = current_weight - (self.goal_weight if self.goal_weight else current_weight)
                days_to_target = 90
                if self.target_date is not None:
                    days_to_target = (self.target_date - self.set_date).days
                if days_to_target <= 0:
                    days_to_target = 1  # To avoid division by zero or negative values

                daily_calorie_change = weight_difference * 7700 / days_to_target  # 1 kg of body weight equals approximately 7700 calories

                # Calculate goal intake calories
                self.goal_intake_cal = static_detail.tdee - daily_calorie_change

        if self.goal_consume_cal is None:
            # Set goal consume calories equal to TDEE only if goal_consume_cal is not provided by the user
            # Get StaticDetail for the account
            static_detail = StaticDetail.objects.filter(account=self.account).first()

            if static_detail and static_detail.tdee is not None:
                self.goal_consume_cal = static_detail.tdee

        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"GoalDetail for {self.account.username}"