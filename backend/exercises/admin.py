from django.contrib import admin
from .models import Workout, Exercise, WorkoutOften, ExercisePre,ExerciseSet

admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(WorkoutOften)
admin.site.register(ExercisePre)
admin.site.register(ExerciseSet)