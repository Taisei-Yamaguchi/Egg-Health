from django.urls import path
from .views import (
    CreateCustomFoodAPIView,
    CustomFoodListAPIView,
    GetFoodHistoryAPIView,
    CreateMealAPIView,
    GetMealsAPIView,
    UpdateMealAPIView,
    DeleteMealAPIView,
    FatSecretSearchAPIView,
    ToggleFoodOftenAPIView,
    FoodOftenListAPIView,
    FoodOftenCheckAPIView,
    CreateMealSetAPIView,
    DeleteMealSetAPIView,
    UpdateMealSetAPIView,
    CreateMealPreAPIView,
    DeleteMealPreAPIView,
    UpdateMealPreAPIView,
    GetMealSetAPIView,
    CreateMealsWithMealSetAPIView,
    GetMealSetListAPIView,
    GetLatestMealsAPIView,
    CreateMealsWithLatestHistory
)
urlpatterns = [
    path('create-food/', CreateCustomFoodAPIView.as_view(), name='create-food'),
    path('custom-food-list/', CustomFoodListAPIView.as_view(), name='custom-food-list'),
    path('get-food-history/', GetFoodHistoryAPIView.as_view(), name='get-food-history'),
    
    path('create-meal/', CreateMealAPIView.as_view(), name='create-meal'),
    path('get-meal/<str:date>/<str:meal_type>/',GetMealsAPIView.as_view(), name='get-meal'),
    path('update-meal/<int:meal_id>/',UpdateMealAPIView.as_view(), name='update-meal'),
    path('delete-meal/<int:meal_id>/',DeleteMealAPIView.as_view(), name='delete-meal'),
    
    path('search-fatsecret/', FatSecretSearchAPIView.as_view(), name='search-fat-secret'),
    path('toggle-often-food/', ToggleFoodOftenAPIView.as_view(), name='toggle-often-food'),
    path('often-food-check/', FoodOftenCheckAPIView.as_view(), name='often-food-check'),
    path('often-food-list/', FoodOftenListAPIView.as_view(), name='often-food-list'),
    
    path('create-meal-set/', CreateMealSetAPIView.as_view(), name='create-meal-set'),
    path('delete-meal-set/<int:meal_set_id>/',DeleteMealSetAPIView.as_view(), name='delete-meal-set'),
    path('update-meal-set/<int:meal_set_id>/',UpdateMealSetAPIView.as_view(), name='update-meal-set'),
    
    path('create-meal-pre/', CreateMealPreAPIView.as_view(), name='create-meal-pre'),
    path('delete-meal-pre/<int:meal_pre_id>/',DeleteMealPreAPIView.as_view(), name='delete-meal-pre'),
    path('update-meal-pre/<int:meal_pre_id>/',UpdateMealPreAPIView.as_view(), name='update-meal-pre'),
    
    path('get-meal-set/<int:meal_set_id>/',GetMealSetAPIView.as_view(), name='get-meal-set'),
    path('get-meal-set-list/',GetMealSetListAPIView.as_view(), name='get-meal-set-list'),
    path('create-meal-with-meal-set/', CreateMealsWithMealSetAPIView.as_view(), name='create-meal-with-meal-set'),
    
    path('get-latest-meal/<str:meal_type>/',GetLatestMealsAPIView.as_view(), name='get-latest-meal'),
    path('create-meals-with-latest-meal/',CreateMealsWithLatestHistory.as_view(), name='create-meals-with-latest-meal'),
    
]
