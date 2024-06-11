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
    WorkoutOftenListAPIView,
    CreateExerciseSetAPIView,
    DeleteExerciseSetAPIView,
    UpdateExerciseSetAPIView,
    CreateExercisePreAPIView,
    DeleteExercisePreAPIView,
    UpdateExercisePreAPIView,
    GetExerciseSetAPIView,
    CreateExercisesWithExerciseSetAPIView,
    GetExerciseSetListAPIView,
    GetLatestExercisesAPIView,
    CreateExercisesWithLatestHistory
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
    
    path('create-exercise-set/', CreateExerciseSetAPIView.as_view(), name='create-exercise-set'),
    path('delete-exercise-set/<int:exercise_set_id>/', DeleteExerciseSetAPIView.as_view(), name='delete-exercise-set'),
    path('update-exercise-set/<int:exercise_set_id>/', UpdateExerciseSetAPIView.as_view(), name='update-exercise-set'),
    path('create-exercise-pre/', CreateExercisePreAPIView.as_view(), name='create-exercise-pre'),
    path('delete-exercise-pre/<int:exercise_pre_id>/', DeleteExercisePreAPIView.as_view(), name='delete-exercise-pre'),
    path('update-exercise-pre/<int:exercise_pre_id>/', UpdateExercisePreAPIView.as_view(), name='update-exercise-pre'),
    path('get-exercise-set/<int:exercise_set_id>/', GetExerciseSetAPIView.as_view(), name='get-exercise-set'),
    path('get-exercise-set-list/', GetExerciseSetListAPIView.as_view(), name='get-exercise-set-list'),
    
    path('create-exercise-with-exercise-set/', CreateExercisesWithExerciseSetAPIView.as_view(), name='create-exercise-with-exercise-set'),
    path('get-latest-exercise/', GetLatestExercisesAPIView.as_view(), name='get-latest-exercise'),
    path('create-exercises-with-latest-exercise/', CreateExercisesWithLatestHistory.as_view(), name='create-exercise-with-latest-exercise'),
    
]
