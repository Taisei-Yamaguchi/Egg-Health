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
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    
    # name,cal are necessary
    name = models.CharField(max_length=100)
    cal = models.FloatField(validators=[MinValueValidator(1)],default=1)
    g_per_serving = models.FloatField(validators=[MinValueValidator(1)],null=True,blank=True)
    food_type = models.CharField(max_length=50, choices=FOOD_TYPES, default='other')

    # fat secret api
    ex_api_id = models.CharField(max_length=100, null=True, blank=True)
    
    custom =models.BooleanField(default=False)
    often =models.BooleanField(default=False)
    
    # Nutrients Field with MinValueValidator
    carb = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    fat = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    protein = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    sugars = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    dietary_fiber = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    salt = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    sodium = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    potassium = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    calcium = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    magnesium = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    iron = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    zinc = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    vitamin_a = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    vitamin_d = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    vitamin_e = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    vitamin_b1 = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    vitamin_b2 = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    vitamin_b12 = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    vitamin_b6 = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    vitamin_c = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    niacin = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    cholesterol = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    saturated_fat = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    def __str__(self):
        return self.name
    
class Meal(models.Model):
    MEAL_TYPE_CHOICES = [
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
        ('Snack', 'Snack'),
    ]
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE)  
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    meal_date = models.DateField() 

    servings = models.FloatField(null=True, blank=True,validators=[MinValueValidator(0)]) 
    grams = models.FloatField(null=True, blank=True,validators=[MinValueValidator(0)]) 
    
    meal_type = models.CharField(max_length=10, choices=MEAL_TYPE_CHOICES) 
    
    def __str__(self):
        return f"Meal {self.id} ({self.account.nickname}) on {self.meal_date} ---{self.food.name}"
    
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
        # Ensure meal.account and meal.food.account match
        if self.food.account != self.account:
            raise ValidationError("You cannot use food items that do not belong to your account.")
    

    def save(self, *args, **kwargs):
        self.full_clean() 
        super(Meal, self).save(*args, **kwargs) 