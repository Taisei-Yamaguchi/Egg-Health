from django.urls import path
from .views import (
    CreateUpdateDynamicDetailAPIView,
    GetDynamicDetailByDateAPIView,
    CreateUpdateGoalDetailAPIView,
    GetGoalDetailAPIView,
    CreateUpdateStaticDetailAPIView,
    GetStaticDetailAPIView,
    GetDynamicAPIView,
    MealIntakeSummaryAPIView,
    ExerciseConsumeSummaryAPIView,
    GetBMRAPIView,
    ExerciseMealCalSummaryAPIView,
    GetLatestWeightAPIView,
    DailyCalsNutrientsAPIView,
    CheckInputByDateAPIView,
    CheckInputByMonthAPIView
)
urlpatterns = [
    path('create-update-dynamic/', CreateUpdateDynamicDetailAPIView.as_view(), name='create-update-dynamic'),
    path('get-dynamic/<str:date>/',GetDynamicDetailByDateAPIView.as_view(), name='get-dynamic-date'),
    path('create-update-goal/', CreateUpdateGoalDetailAPIView.as_view(), name='create-update-goal'),
    path('get-goal/',GetGoalDetailAPIView.as_view(), name='get-goal'),
    path('create-update-static/', CreateUpdateStaticDetailAPIView.as_view(), name='create-update-static'),
    path('get-static/',GetStaticDetailAPIView.as_view(), name='get-static'),
    path('get-dynamic/',GetDynamicAPIView.as_view(), name='get-dynamic'),
    
    path('get-meal-cal/',MealIntakeSummaryAPIView.as_view(), name='get-meal-cal'),
    path('get-exercise-cal/',ExerciseConsumeSummaryAPIView.as_view(), name='get-exercise-cal'),
    path('get-bmr/',GetBMRAPIView.as_view(), name='get-bmr'),
    path('get-exercise-meal-cal/',ExerciseMealCalSummaryAPIView.as_view(), name='get-exercise-meal-cal'),
    
    path('get-latest-weight/',GetLatestWeightAPIView.as_view(), name='get-latest-weight'),
    
    path('daily-cals-nutrients/<str:date>/',DailyCalsNutrientsAPIView.as_view(), name='daily-cals-nutrients'),
    path('check-input/<str:date>/',CheckInputByDateAPIView.as_view(), name='check-input-date'),
    path('check-input-month/<str:month>/',CheckInputByMonthAPIView.as_view(), name='check-input-month'),
]
