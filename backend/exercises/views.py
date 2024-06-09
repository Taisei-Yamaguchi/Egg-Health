from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,serializers
from .models import Workout,Exercise, WorkoutOften
from .serializers import WorkoutSerializer,CreateExerciseSerializer,GetExerciseSerializer,UpdateExerciseMinsSerializer, WorkoutOftenSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from rest_framework.generics import  DestroyAPIView
from django.core.exceptions import ValidationError
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

# get Default Workout By Type　Restfull
class GetDefaultWorkoutByTypeAPIView(APIView):
    def get(self, request, type):
        try:
            workouts = Workout.objects.filter(type=type, custom=False, account=None)
            serialized_workouts = WorkoutSerializer(workouts, many=True)
            return Response({'message': 'Default workouts fetched successfully!', 'data': serialized_workouts.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching default workouts.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# get Default Workout By search　Restfull
class GetDefaultWorkoutBySearchAPIView(APIView):
    def get(self, request):
        search_key = request.query_params.get('search_key', None)
        if search_key is None:
            return Response({'message': 'No search key specified.', 'data': []}, status=status.HTTP_200_OK)
        try:
            workouts = Workout.objects.filter(name__icontains=search_key, custom=False, account=None) | \
                    Workout.objects.filter(ja_name__icontains=search_key, custom=False, account=None)
            serialized_workouts = WorkoutSerializer(workouts, many=True)
            return Response({'message': 'Default workouts fetched successfully!', 'data': serialized_workouts.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching default workouts.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
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


class ToggleWorkoutOftenAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        account = request.user
        workout_id = request.data.get('workout_id')
        if not workout_id:
            return Response({'error': 'Workout ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        workout = get_object_or_404(Workout, id=workout_id)
        if workout.custom and workout.account != account:
            return Response({"error": "You cannot use workout items that do not belong to your account."},status=status.HTTP_400_BAD_REQUEST)
        workout_often, created = WorkoutOften.objects.get_or_create(account=account, workout=workout)
        if not created:
            workout_often.delete()
            return Response({"message": "Workout often removed"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Workout often added"}, status=status.HTTP_201_CREATED)

class WorkoutOftenListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = request.user
        try:
            workout_often_list = WorkoutOften.objects.filter(account=account)
            workouts = [wo.workout for wo in workout_often_list]
            serializer = WorkoutSerializer(workouts, many=True)
            return Response({'message': 'Get often workouts successfully!','data':serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching often workouts.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)