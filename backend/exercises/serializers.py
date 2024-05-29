from rest_framework import serializers
from .models import Workout,Exercise
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