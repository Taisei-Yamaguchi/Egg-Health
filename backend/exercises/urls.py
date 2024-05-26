from django.urls import path
from .views import (
    CustomWorkoutListAPIView,
    CreateCustomWorkoutAPIView,
    CreateExerciseAPIView,
    GetExercisesAPIView,
    UpdateExerciseAPIView,
    DeleteExerciseAPIView,
    GetWorkoutHistoryAPIView
)
urlpatterns = [
    path('custom-workout-list/', CustomWorkoutListAPIView.as_view(), name='custom-workout-list'),
    path('create-custom-workout/', CreateCustomWorkoutAPIView.as_view(), name='create-custom-workout'),
    path('create-exercise/', CreateExerciseAPIView.as_view(), name='create-exercise'),
    path('get-exercises/<str:exercise_date>/', GetExercisesAPIView.as_view(), name='get-exercises'),
    path('update-exercise/<int:exercise_id>/', UpdateExerciseAPIView.as_view(), name='update-exercise'),
    path('delete-exercise/<int:exercise_id>/', DeleteExerciseAPIView.as_view(), name='delete-exercise'),
    path('get-workout-history/', GetWorkoutHistoryAPIView.as_view(), name='get-workout-history'),
]
