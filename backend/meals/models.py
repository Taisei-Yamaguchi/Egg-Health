from django.db import models
from accounts.models import Account
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator

class Food(models.Model):
    FOOD_TYPES = [
        ('vegetable', 'Vegetable'),
        ('fruit', 'Fruit'),
        ('beverage','Beverage'),
        ('rice','Rice'),
        ('soup','Soup'),
        ('bread','Bread'),
        ('noodel','Noodle'),
        ('pasta','Pasta'),
        ('fish','Fish'),
        ('meat','Meat'),
        ('milk','Milk'),
        ('snack','Snack'),
        ('alchol','Alchol'),
        ('other','Other')
    ]
    account = models.ForeignKey(Account, on_delete=models.CASCADE,null=True,blank=True)
    
    # name,cal are necessary
    name = models.CharField(max_length=100)
    cal = models.FloatField(validators=[MinValueValidator(1)],default=1)
    g_per_serving = models.FloatField(validators=[MinValueValidator(1)],null=True,blank=True)
    food_type = models.CharField(max_length=50, choices=FOOD_TYPES, default='other')

    # fat secret api
    ex_api_id = models.CharField(max_length=100, null=True, blank=True)
    
    custom =models.BooleanField(default=False)
    often =models.BooleanField(default=False)
    
    # Nutrients Field with MinValueValidator and default=0
    carb = models.FloatField(validators=[MinValueValidator(0)], default=0)
    fat = models.FloatField(validators=[MinValueValidator(0)], default=0)
    protein = models.FloatField(validators=[MinValueValidator(0)], default=0)
    sugars = models.FloatField(validators=[MinValueValidator(0)], default=0)
    dietary_fiber = models.FloatField(validators=[MinValueValidator(0)], default=0)
    salt = models.FloatField(validators=[MinValueValidator(0)], default=0)
    sodium = models.FloatField(validators=[MinValueValidator(0)], default=0)
    potassium = models.FloatField(validators=[MinValueValidator(0)], default=0)
    calcium = models.FloatField(validators=[MinValueValidator(0)], default=0)
    magnesium = models.FloatField(validators=[MinValueValidator(0)], default=0)
    iron = models.FloatField(validators=[MinValueValidator(0)], default=0)
    zinc = models.FloatField(validators=[MinValueValidator(0)], default=0)
    vitamin_a = models.FloatField(validators=[MinValueValidator(0)], default=0)
    vitamin_d = models.FloatField(validators=[MinValueValidator(0)], default=0)
    vitamin_e = models.FloatField(validators=[MinValueValidator(0)], default=0)
    vitamin_b1 = models.FloatField(validators=[MinValueValidator(0)], default=0)
    vitamin_b2 = models.FloatField(validators=[MinValueValidator(0)], default=0)
    vitamin_b12 = models.FloatField(validators=[MinValueValidator(0)], default=0)
    vitamin_b6 = models.FloatField(validators=[MinValueValidator(0)], default=0)
    vitamin_c = models.FloatField(validators=[MinValueValidator(0)], default=0)
    niacin = models.FloatField(validators=[MinValueValidator(0)], default=0)
    cholesterol = models.FloatField(validators=[MinValueValidator(0)], default=0)
    saturated_fat = models.FloatField(validators=[MinValueValidator(0)], default=0)

    def __str__(self):
        username = self.account.username if self.account else "null"
        return f"Food {self.id} {self.name} on ({username})"
    
class Meal(models.Model):
    MEAL_TYPE_CHOICES = [
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
        ('Snack', 'Snack'),
    ]
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE)  
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    date = models.DateField() 
    servings = models.FloatField(null=True, blank=True,validators=[MinValueValidator(0)]) 
    grams = models.FloatField(null=True, blank=True,validators=[MinValueValidator(0)]) 
    meal_type = models.CharField(max_length=10, choices=MEAL_TYPE_CHOICES)
    intake_cal = models.FloatField(validators=[MinValueValidator(1)],default=1) 
    
    def __str__(self):
        return f"Meal {self.id} ({self.account.username}) on {self.date} ---{self.food.name}"
    
    def clean(self):
        if self.servings is None and self.grams is None:
            raise ValidationError("Serving or grams is required.")
        
        if self.grams == 0 and self.servings == 0:
            raise ValidationError("Grams and Serving cannot be 0 at the same time.")

        if (self.grams is None or self.grams <=0) and (self.servings is None or self.servings <= 0):
            raise ValidationError("If you don't set grams, Serving should be greater than 0.If you don't set serving, Grams should be greater than 0.")

        if not self.food.g_per_serving:
            if self.grams is not None:
                raise ValidationError("For food without g_per_serving, grams must be null.")
        if self.food.custom and self.account != self.food.account:
            raise ValidationError("You cannot use custom food items that do not belong to your account.")

    def save(self, *args, **kwargs):
        if self.servings is not None and self.servings > 0:
            self.intake_cal = self.servings * self.food.cal
        elif self.grams is not None and self.food.g_per_serving is not None and self.grams > 0:
            self.intake_cal = (self.grams * self.food.cal) / self.food.g_per_serving
        else:
            self.intake_cal = 1  # Default value if no valid servings or grams

        self.full_clean()
        super(Meal, self).save(*args, **kwargs)