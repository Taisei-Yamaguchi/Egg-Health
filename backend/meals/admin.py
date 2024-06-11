from django.contrib import admin
from .models import Food, Meal,FatSecretFood, FoodOften, MealPre, MealSet

admin.site.register(Food)
admin.site.register(Meal)
admin.site.register(FatSecretFood)
admin.site.register(FoodOften)
admin.site.register(MealPre)
admin.site.register(MealSet)