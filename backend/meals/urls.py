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
    FatSecretSearchAPIView
)
urlpatterns = [
    path('create-food/', CreateCustomFoodAPIView.as_view(), name='create-food'),
    path('custom-food-list/', CustomFoodListAPIView.as_view(), name='custom-food-list'),
    # path('often-food-list/', OftenFoodListAPIView.as_view(), name='often-food-list'),
    # path('toggle-often-food/<int:food_id>/', ToggleOftenFoodAPIView.as_view(), name='toggle-often-food'),
    path('get-food-history/', GetFoodHistoryAPIView.as_view(), name='get-food-history'),
    
    path('create-meal/', CreateMealAPIView.as_view(), name='create-meal'),
    path('get-meal/<str:date>/<str:meal_type>/',GetMealsAPIView.as_view(), name='get-meal'),
    path('update-meal/<int:meal_id>/',UpdateMealAPIView.as_view(), name='update-meal'),
    path('delete-meal/<int:meal_id>/',DeleteMealAPIView.as_view(), name='delete-meal'),
    path('get-latest-meal/<str:meal_type>/',GetLatestMealsAPIView.as_view(), name='get-latest-meal'),
    
    path('search-fatsecret/', FatSecretSearchAPIView.as_view(), name='search-fat-secret'),
]
