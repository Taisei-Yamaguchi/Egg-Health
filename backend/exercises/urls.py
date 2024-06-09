from django.urls import path
from .views import (
    CustomWorkoutListAPIView,
    GetDefaultWorkoutByTypeAPIView,
    GetDefaultWorkoutBySearchAPIView,
    CreateCustomWorkoutAPIView,
    CreateExerciseAPIView,
    GetExercisesAPIView,
    UpdateExerciseAPIView,
    DeleteExerciseAPIView,
    GetWorkoutHistoryAPIView,
    ToggleWorkoutOftenAPIView,
    WorkoutOftenListAPIView
)
urlpatterns = [
    path('custom-workout-list/', CustomWorkoutListAPIView.as_view(), name='custom-workout-list'),
    path('get-default-workouts/<str:type>/', GetDefaultWorkoutByTypeAPIView.as_view(), name='get-default-workouts-type'),
    path('get-default-workouts/', GetDefaultWorkoutBySearchAPIView.as_view(), name='get-default-workouts-search'),
    
    path('create-custom-workout/', CreateCustomWorkoutAPIView.as_view(), name='create-custom-workout'),
    path('create-exercise/', CreateExerciseAPIView.as_view(), name='create-exercise'),
    path('get-exercises/<str:date>/', GetExercisesAPIView.as_view(), name='get-exercises'),
    path('update-exercise/<int:exercise_id>/', UpdateExerciseAPIView.as_view(), name='update-exercise'),
    path('delete-exercise/<int:exercise_id>/', DeleteExerciseAPIView.as_view(), name='delete-exercise'),
    path('get-workout-history/', GetWorkoutHistoryAPIView.as_view(), name='get-workout-history'),
    
    path('toggle-often-workout/', ToggleWorkoutOftenAPIView.as_view(), name='toggle-often-workout'),
    path('often-workout-list/', WorkoutOftenListAPIView.as_view(), name='often-workout-list'),
    
]
