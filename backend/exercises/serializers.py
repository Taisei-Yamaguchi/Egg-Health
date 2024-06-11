from rest_framework import serializers
from .models import Workout,Exercise, WorkoutOften, ExerciseSet,ExercisePre
from django.core.exceptions import ValidationError

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

class GetExerciseSerializer(serializers.ModelSerializer):
    workout = WorkoutSerializer(required=True)
    class Meta:
        model = Exercise
        fields = '__all__'

class CreateExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'
        
    def validate(self, data):
        # Temporarily create a Exercise instance to use the clean method
        exercise = Exercise(**data)
        try:
            exercise.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return data
        
class UpdateExerciseMinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__' 
        read_only_fields = ['account', 'workout', 'date', 'consumed_cal'] 

    def update(self, instance, validated_data):
        instance.mins = validated_data.get('mins', instance.mins)
        instance.save()
        return instance
    
class WorkoutOftenSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutOften
        fields = '__all__'

    def validate(self, data):
        # Temporarily create a Often Workout instance to use the clean method
        workout_often = WorkoutOften(**data)
        try:
            workout_often.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return data

class ExerciseSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseSet
        fields = '__all__'
        
class ExercisePreSerializer(serializers.ModelSerializer):
    exercise_set = ExerciseSetSerializer()
    class Meta:
        model = ExercisePre
        fields = '__all__'
        
class ExercisePreCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExercisePre
        fields = '__all__'
    
    def validate(self, data):
        # Temporarily create a Exercise Pre instance to use the clean method
        exercise_pre = ExercisePre(**data)
        try:
            exercise_pre.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return data
    
    
class ExercisePreUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExercisePre
        fields = '__all__' 
        read_only_fields = ['account', 'workout'] 

    def update(self, instance, validated_data):
        instance.mins = validated_data.get('mins', instance.mins)
        instance.save()
        return instance
    
class GetExercisePreSerializer(serializers.ModelSerializer):
    workout = WorkoutSerializer()
    class Meta:
        model = ExercisePre
        fields = '__all__'