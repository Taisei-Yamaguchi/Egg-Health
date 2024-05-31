from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Meal,Food, FatSecretFood

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'

class FoodUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['often']

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'
    def validate(self, data):
        # Temporarily create a Meal instance to use the clean method
        meal = Meal(**data)
        try:
            meal.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return data

class MealUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['servings', 'grams']
    def validate(self, data):
        # Temporarily create a Meal instance to use the clean method
        meal = self.instance
        instance = self.instance
        if 'servings' in data:
            instance.servings = data['servings']
        if 'grams' in data:
            instance.grams = data['grams']
        
        try:
            meal.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return data

class FatSecretFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = FatSecretFood
        fields = '__all__'

class GetMealSerializer(serializers.ModelSerializer):
    food=FoodSerializer()
    fat_secret_food=FatSecretFoodSerializer()
    class Meta:
        model = Meal
        fields = '__all__'