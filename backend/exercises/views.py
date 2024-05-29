from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Workout,Exercise
from .serializers import WorkoutSerializer,CreateExerciseSerializer,GetExerciseSerializer,UpdateExerciseMinsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from rest_framework.generics import  DestroyAPIView

from django.db.models import Max

# get Custom Workout
class CustomWorkoutListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        try:
            account = request.user
            workouts = Workout.objects.filter(account=account.id)
            serialized_workouts = WorkoutSerializer(workouts, many=True)
            return Response({'message': 'Get Custom Workout List successfully!', 'data': serialized_workouts.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching custom workouts.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#create Custom Workout
class CreateCustomWorkoutAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = self.request.user
        request.data['account'] = account.id
        request.data['custom'] = True
        serializer = WorkoutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Custom Workout added successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# get workout history
class GetWorkoutHistoryAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        try:
            user_exercisess = Exercise.objects.filter(account=account).order_by('-date')
            serializer = GetExerciseSerializer(user_exercisess, many=True)
            workout_history = [exercise['workout'] for exercise in serializer.data]
            unique_workout_history = []
            seen_ids = set()
            for workout in workout_history:
                workout_id = workout['id']
                if workout_id not in seen_ids:
                    unique_workout_history.append(workout)
                    seen_ids.add(workout_id)
            return Response({'message': 'Get workout history successfully!', 'data': unique_workout_history}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while getting workout history".', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Create Exercise with Custom Workout
class CreateExerciseAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = self.request.user
        request.data['account'] = account.id
        serializer = CreateExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Exercise added successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Get Exercise By Date
class GetExercisesAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, date):
        account = self.request.user
        if date is None:
            return Response({'error': 'date\ parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            exercises = Exercise.objects.filter(date = date,account=account.id).order_by('id')
            serialized_exercises=GetExerciseSerializer(exercises,many=True)
            return Response({'message': 'Get exercises successfully!', 'data': serialized_exercises.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching exercises.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# update exercise, mainly mins.
class UpdateExerciseAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, exercise_id):
        account = self.request.user
        exercise = get_object_or_404(Exercise, id=exercise_id, account=account.id)
        serializer = UpdateExerciseMinsSerializer(instance=exercise, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Exercise updated successfully!','data':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Exercise Delete
class DeleteExerciseAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, exercise_id):
        try:
            exercise = Exercise.objects.get(pk=exercise_id)
            if request.user == exercise.account:
                exercise.delete()
                return Response({'message': 'Exercise deleted successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'You do not have permission to delete this exercise.'}, status=status.HTTP_403_FORBIDDEN)
        except Exercise.DoesNotExist:
            return Response({'error': 'Exercise not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
