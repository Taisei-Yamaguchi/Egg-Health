from django.urls import path
from .views import (
    CreateCustomFoodAPIView,
    CustomFoodListAPIView,
    # OftenFoodListAPIView,
    # ToggleOftenFoodAPIView,
    GetFoodHistoryAPIView,
    CreateMealAPIView,
    GetMealsAPIView,
    UpdateMealAPIView,
    DeleteMealAPIView,
    GetLatestMealsAPIView,
    FatSecretSearchAPIView,
    ToggleFoodOftenAPIView,
    FoodOftenListAPIView,
    FoodOftenCheckAPIView
)
urlpatterns = [
    path('create-food/', CreateCustomFoodAPIView.as_view(), name='create-food'),
    path('custom-food-list/', CustomFoodListAPIView.as_view(), name='custom-food-list'),
    path('get-food-history/', GetFoodHistoryAPIView.as_view(), name='get-food-history'),
    
    path('create-meal/', CreateMealAPIView.as_view(), name='create-meal'),
    path('get-meal/<str:date>/<str:meal_type>/',GetMealsAPIView.as_view(), name='get-meal'),
    path('update-meal/<int:meal_id>/',UpdateMealAPIView.as_view(), name='update-meal'),
    path('delete-meal/<int:meal_id>/',DeleteMealAPIView.as_view(), name='delete-meal'),
    path('get-latest-meal/<str:meal_type>/',GetLatestMealsAPIView.as_view(), name='get-latest-meal'),
    
    path('search-fatsecret/', FatSecretSearchAPIView.as_view(), name='search-fat-secret'),
    path('toggle-often-food/', ToggleFoodOftenAPIView.as_view(), name='toggle-often-food'),
    path('often-food-check/', FoodOftenCheckAPIView.as_view(), name='often-food-check'),
    path('often-food-list/', FoodOftenListAPIView.as_view(), name='often-food-list'),
]
