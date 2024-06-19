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
    g_per_serving = models.FloatField(validators=[MinValueValidator(1)],null=True,blank=True)
    food_type = models.CharField(max_length=50, choices=FOOD_TYPES, default='other')
    custom =models.BooleanField(default=False)
    often =models.BooleanField(default=False)
    
    cal = models.FloatField(validators=[MinValueValidator(1)],default=1)
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
    polyunsaturated_fat = models.FloatField(validators=[MinValueValidator(0)], default=0)
    monounsaturated_fat = models.FloatField(validators=[MinValueValidator(0)], default=0)
    
    def __str__(self):
        username = self.account.username if self.account else "null"
        return f"Food {self.id} {self.name} on ({username})"



class FatSecretFood(models.Model):
    food_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    brand_name = models.CharField(max_length=255, null=True, blank=True)
    url = models.URLField(max_length=2000)
    description = models.TextField(null=True, blank=True)
    
    cal = models.FloatField(validators=[MinValueValidator(0)],default=0)
    # nutrient
    carb = models.FloatField(validators=[MinValueValidator(0)],default=0)
    fat = models.FloatField(validators=[MinValueValidator(0)],default=0)
    protein = models.FloatField(validators=[MinValueValidator(0)],default=0)
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
    polyunsaturated_fat = models.FloatField(validators=[MinValueValidator(0)], default=0)
    monounsaturated_fat = models.FloatField(validators=[MinValueValidator(0)], default=0)
    
    unit = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.id}-FatsecretFood -{self.food_id}: {self.name}"

class Meal(models.Model):
    MEAL_TYPE_CHOICES = [
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
        ('Snack', 'Snack'),
    ]
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE)  
    food = models.ForeignKey(Food, null=True, blank=True, on_delete=models.CASCADE)
    fat_secret_food = models.ForeignKey(FatSecretFood, null=True, blank=True, on_delete=models.CASCADE)
    
    date = models.DateField() 
    servings = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)]) 
    grams = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)]) 
    meal_type = models.CharField(max_length=10, choices=MEAL_TYPE_CHOICES)
    intake_cal = models.FloatField(validators=[MinValueValidator(0)], default=0) 
    intake_protein = models.FloatField(validators=[MinValueValidator(0)], default=0)
    intake_fat = models.FloatField(validators=[MinValueValidator(0)], default=0)
    intake_carbs = models.FloatField(validators=[MinValueValidator(0)], default=0)
    
    def __str__(self):
        return f"Meal {self.id} ({self.account.username}) on {self.date} --- {self.food.name if self.food else self.fat_secret_food.name}"
    
    def clean(self):
        if (self.food is None and self.fat_secret_food is None) or (self.food is not None and self.fat_secret_food is not None):
            raise ValidationError("Either food or fat_secret_food must be set, but not both.")

        if self.servings is None and self.grams is None:
            raise ValidationError("Serving or grams is required.")
        
        if self.grams == 0 and self.servings == 0:
            raise ValidationError("Grams and Serving cannot be 0 at the same time.")

        if (self.grams is None or self.grams <= 0) and (self.servings is None or self.servings <= 0):
            raise ValidationError("If you don't set grams, Serving should be greater than 0. If you don't set serving, Grams should be greater than 0.")

        if self.food:
            if not self.food.g_per_serving and self.grams is not None:
                raise ValidationError("For food without g_per_serving, grams must be null.")
            if self.food.custom and self.account != self.food.account:
                raise ValidationError("You cannot use custom food items that do not belong to your account.")
        
        if self.fat_secret_food:
            if self.fat_secret_food.unit == "100g":
                if self.servings is not None and self.servings > 0:
                    raise ValidationError("For fat_secret_food with unit '100g', servings must be null.")
            else:
                if self.grams is not None and self.grams > 0:
                    raise ValidationError(f"For fat_secret_food with unit '{self.fat_secret_food.unit}', grams must be null.")

    def save(self, *args, **kwargs):
        if self.food:
            if self.servings is not None and self.servings > 0:
                self.intake_cal = self.servings * self.food.cal
                self.intake_protein = self.servings * self.food.protein
                self.intake_fat = self.servings * self.food.fat
                self.intake_carbs = self.servings * self.food.carb
            elif self.grams is not None and self.food.g_per_serving is not None and self.grams > 0:
                self.intake_cal = (self.grams * self.food.cal) / self.food.g_per_serving
                self.intake_protein = (self.grams * self.food.protein) / self.food.g_per_serving
                self.intake_fat = (self.grams * self.food.fat) / self.food.g_per_serving
                self.intake_carbs = (self.grams * self.food.carb) / self.food.g_per_serving
            else:
                self.intake_cal = 0  # Default value if no valid servings or grams
                self.intake_protein = 0
                self.intake_fat = 0
                self.intake_carbs = 0
        elif self.fat_secret_food:
            if self.servings is not None and self.servings > 0:
                self.intake_cal = self.servings * self.fat_secret_food.cal
                self.intake_protein = self.servings * self.fat_secret_food.protein
                self.intake_fat = self.servings * self.fat_secret_food.fat
                self.intake_carbs = self.servings * self.fat_secret_food.carb
            elif self.grams is not None and self.grams > 0:
                self.intake_cal = (self.grams * self.fat_secret_food.cal) / 100
                self.intake_protein = (self.grams * self.fat_secret_food.protein) / 100
                self.intake_fat = (self.grams * self.fat_secret_food.fat) / 100
                self.intake_carbs = (self.grams * self.fat_secret_food.carb) / 100
            else:
                self.intake_cal = 0  # Default value if no valid servings or grams
                self.intake_protein = 0
                self.intake_fat = 0
                self.intake_carbs = 0
        else:
            self.intake_cal = 0  # Default value if no food or fat_secret_food is set
            self.intake_protein = 0
            self.intake_fat = 0
            self.intake_carbs = 0
        self.full_clean()
        super(Meal, self).save(*args, **kwargs)
        
        

class FoodOften(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE, null=True, blank=True)
    fatsecret_food = models.ForeignKey(FatSecretFood, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        unique_together = ('account', 'food', 'fatsecret_food')

    def clean(self):
        if self.food and self.fatsecret_food:
            raise ValidationError("Either food or fatsecret_food must be set, but not both.")
        if not self.food and not self.fatsecret_food:
            raise ValidationError("One of food or fatsecret_food must be set.")
        if self.food and self.food.account != self.account:
            raise ValidationError("You cannot use food items that do not belong to your account.")
        
        # Check for uniqueness
        if self.food:
            if FoodOften.objects.filter(account=self.account, food=self.food).exclude(pk=self.pk).exists():
                raise ValidationError("This food is already marked as often for this account.")
        if self.fatsecret_food:
            if FoodOften.objects.filter(account=self.account, fatsecret_food=self.fatsecret_food).exclude(pk=self.pk).exists():
                raise ValidationError("This fatsecret_food is already marked as often for this account.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"FoodOften for {self.account.username} - {self.food.name if self.food else self.fatsecret_food.name}"



class MealSet(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.id}-MealSet {self.name} ({self.account.username})"
    
class MealPre(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    meal_set = models.ForeignKey(MealSet, related_name='meal_pres', on_delete=models.CASCADE)
    food = models.ForeignKey(Food, null=True, blank=True, on_delete=models.CASCADE)
    fat_secret_food = models.ForeignKey(FatSecretFood, null=True, blank=True, on_delete=models.CASCADE)
    servings = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])
    grams = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])
    intake_cal = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])

    def clean(self):
        if self.meal_set.account != self.account:
            raise ValidationError("You cannot use meal sets that do not belong to your account.")
        
        if (self.food is None and self.fat_secret_food is None) or (self.food is not None and self.fat_secret_food is not None):
            raise ValidationError("Either food or fat_secret_food must be set, but not both.")
        
        if self.servings is None and self.grams is None:
            raise ValidationError("Serving or grams is required.")
        
        if self.grams == 0 and self.servings == 0:
            raise ValidationError("Grams and Serving cannot be 0 at the same time.")
        
        if (self.grams is None or self.grams <= 0) and (self.servings is None or self.servings <= 0):
            raise ValidationError("If you don't set grams, Serving should be greater than 0. If you don't set serving, Grams should be greater than 0.")
        
        if self.food:
            if not self.food.g_per_serving and self.grams is not None:
                raise ValidationError("For food without g_per_serving, grams must be null.")
            if self.food.custom and self.food.account != self.account:
                raise ValidationError("You cannot use custom food items that do not belong to your account.")
        
        if self.fat_secret_food:
            if self.fat_secret_food.unit == "100g":
                if self.servings is not None and self.servings > 0:
                    raise ValidationError("For fat_secret_food with unit '100g', servings must be null.")
            else:
                if self.grams is not None and self.grams > 0:
                    raise ValidationError(f"For fat_secret_food with unit '{self.fat_secret_food.unit}', grams must be null.")
    
    def save(self, *args, **kwargs):
        if self.food:
            if self.servings is not None and self.servings > 0:
                self.intake_cal = self.servings * self.food.cal
            elif self.grams is not None and self.food.g_per_serving is not None and self.grams > 0:
                self.intake_cal = (self.grams * self.food.cal) / self.food.g_per_serving
            else:
                self.intake_cal = 0  # Default value if no valid servings or grams
        elif self.fat_secret_food:
            if self.servings is not None and self.servings > 0:
                self.intake_cal = self.servings * self.fat_secret_food.cal
            elif self.grams is not None and self.grams > 0:
                self.intake_cal = (self.grams * self.fat_secret_food.cal) / 100
            else:
                self.intake_cal = 0  # Default value if no valid servings or grams
        else:
            self.intake_cal = 0  # Default value if no food or fat_secret_food is set
            
        super().save(*args, **kwargs)
    def __str__(self):
        return f"MealPre {self.id}- {self.account.username} ({self.meal_set.name})"