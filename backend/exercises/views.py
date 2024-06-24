from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,serializers
from .models import Workout,Exercise, WorkoutOften, ExercisePre, ExerciseSet
from .serializers import (
    WorkoutSerializer,
    CreateExerciseSerializer,
    GetExerciseSerializer,
    UpdateExerciseMinsSerializer, 
    ExerciseSetSerializer,
    ExercisePreCreateSerializer,
    ExercisePreUpdateSerializer,
    GetExercisePreSerializer
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.db.models import Max
from license.models import License

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
            return Response({'message': 'Default activities fetched successfully!', 'data': serialized_workouts.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching default activities.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
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
            return Response({'message':'Custom Activity added successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Custom Workoiut Delete
class DeleteWorkoutAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, workout_id):
        try:
            workout = Workout.objects.get(pk=workout_id)
            if workout.custom and request.user == workout.account:
                workout.delete()
                return Response({'message': 'Custom Activity deleted successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'You do not have permission to delete this activity.'}, status=status.HTTP_403_FORBIDDEN)
        except Exercise.DoesNotExist:
            return Response({'error': 'Activity not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# get workout history
class GetWorkoutHistoryAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        try:
            user_exercisess = Exercise.objects.filter(account=account).order_by('-date')[:50]
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


# Toggle Workout OFten (premium)
class ToggleWorkoutOftenAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        account = request.user
        license = get_object_or_404(License, account=account.id)
        if license and license.license_type in ['premium', 'premium_plus']:
        
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
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)

# workout oftne list (premium)
class WorkoutOftenListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = request.user
        license = get_object_or_404(License, account=account.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            try:
                workout_often_list = WorkoutOften.objects.filter(account=account)
                workouts = [wo.workout for wo in workout_often_list]
                serializer = WorkoutSerializer(workouts, many=True)
                return Response({'message': 'Get often workouts successfully!','data':serializer.data}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'An error occurred while fetching often workouts.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)


# create ExerciseSet (premium)
class CreateExerciseSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = request.user
        license = get_object_or_404(License, account=account.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            request.data['account'] = account.id
            serializer = ExerciseSetSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Exercise Set created successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)

# Delete Exercise Set (premium)
class DeleteExerciseSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, exercise_set_id):
        try:
            license = get_object_or_404(License, account=request.user.id)
            if license and license.license_type in ['premium', 'premium_plus']:
        
                exercise_set = ExerciseSet.objects.get(pk=exercise_set_id)
                if request.user == exercise_set.account:
                    exercise_set.delete()
                    return Response({'message': 'Exercise Set deleted successfully!'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'You do not have permission to delete this exercise set.'}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)

        except ExerciseSet.DoesNotExist:
            return Response({'error': 'Exercise Set not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# update exercise set (premium)
class UpdateExerciseSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, exercise_set_id):
        user = self.request.user
        license = get_object_or_404(License, account=user.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            exercise_set = get_object_or_404(ExerciseSet, id=exercise_set_id, account=user.id)
            serializer = ExerciseSetSerializer(instance=exercise_set, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Exercise Set updated successfully!','data':serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)

# Create ExercisePre with Workout by designating exercise_set (premium)
class CreateExercisePreAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = self.request.user
        license = get_object_or_404(License, account=account.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            request.data['account'] = account.id
            serializer = ExercisePreCreateSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'ExercisePre created successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)

# Delete Exercise Pre (premium)
class DeleteExercisePreAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, exercise_pre_id):
        try:
            license = get_object_or_404(License, account=request.user.id)
            if license and license.license_type in ['premium', 'premium_plus']:
                exercise_pre = ExercisePre.objects.get(pk=exercise_pre_id)
                if request.user == exercise_pre.account:
                    exercise_pre.delete()
                    return Response({'message': 'Exercise Pre deleted successfully!'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'You do not have permission to delete this exercise pre.'}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)

        except ExercisePre.DoesNotExist:
            return Response({'error': 'Exercise Pre not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# update exercise pre, mainly mins. (premium)
class UpdateExercisePreAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, exercise_pre_id):
        user = self.request.user
        license = get_object_or_404(License, account=user.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            
            exercise_pre = get_object_or_404(ExercisePre, id=exercise_pre_id, account=user.id)
            serializer = ExercisePreUpdateSerializer(instance=exercise_pre, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Exercise Pre updated successfully!','data':serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)


# Get ExercisePre By exercise_set_id (premium)
class GetExerciseSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, exercise_set_id):
        account = self.request.user
        license = get_object_or_404(License, account=account.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            if exercise_set_id is None:
                return Response({'error': 'exercise_set_id parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                exercise_set = ExerciseSet.objects.get(id=exercise_set_id, account=account)
                exercise_pres =ExercisePre.objects.filter(exercise_set=exercise_set_id,account=account.id).order_by('id')
                serializer=GetExercisePreSerializer(exercise_pres,many=True)
                return Response({
                    'message': 'Get exercise set successfully!',
                    'data': {
                        'exercise_set_id': exercise_set.id,
                        'exercise_set_name': exercise_set.name,
                        'exercise_pres': serializer.data
                    }
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'An error occurred while fetching exercise set.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)


# Create Exercises with ExerciseSet (premium)
class CreateExercisesWithExerciseSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        account = self.request.user
        license = get_object_or_404(License, account=account.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            date = request.data.get('date')
            exercise_set_id = request.data.get('exercise_set_id')

            if not date or not exercise_set_id:
                return Response({'error': ' date and exercise_set_id are required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                exercise_set = ExerciseSet.objects.get(id=exercise_set_id, account=account)
                exercise_pres_list = ExercisePre.objects.filter(exercise_set=exercise_set, account=account)
                
                created_exercises = []
                for exercise_pre in exercise_pres_list:
                    exercise_data = {
                        'account': account.id,
                        'date': date,
                        'workout': exercise_pre.workout.id,
                        'mins': exercise_pre.mins
                    }
                    serializer = CreateExerciseSerializer(data=exercise_data)
                    if serializer.is_valid():
                        created_exercise = serializer.save()
                        created_exercises.append(serializer.data)
                    else:
                        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

                return Response({'message': 'Exercises added successfully!', 'data': created_exercises}, status=status.HTTP_201_CREATED)
            except ExerciseSet.DoesNotExist:
                return Response({'error': 'Exercise set not found.'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': 'An error occurred while creating exercises.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)


# Get ExerciseSet List (premium)
class GetExerciseSetListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = self.request.user
        license = get_object_or_404(License, account=account.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            try:
                exercise_sets = ExerciseSet.objects.filter(account=account)
                response_data = []

                for exercise_set in exercise_sets:
                    exercise_pres = ExercisePre.objects.filter(exercise_set=exercise_set, account=account).order_by('id')
                    serializer = GetExercisePreSerializer(exercise_pres, many=True)
                    response_data.append({
                        'exercise_set_id': exercise_set.id,
                        'exercise_set_name': exercise_set.name,
                        'exercise_pres': serializer.data
                    })

                return Response({'message': 'Get exercise sets successfully!', 'data': response_data}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'An error occurred while fetching exercise sets.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)


# Get latest Exercises (premium)
class GetLatestExercisesAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        license = get_object_or_404(License, account=account.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            try:
                latest_exercise_date = (
                    Exercise.objects.filter(account=account.id)
                    .aggregate(max_date=Max('date'))
                    .get('max_date')
                )
                exercises = Exercise.objects.filter(account=account.id,date=latest_exercise_date).order_by('id')
                serialized_exercises = GetExerciseSerializer(exercises, many=True)
                return Response({'message': 'Get latest exercises successfully!', 'data': serialized_exercises.data}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'An error occurred while fetching latest exercises.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)


# Create Exercise with Latest History (premium)
class CreateExercisesWithLatestHistory(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        account = self.request.user
        license = get_object_or_404(License, account=account.id)
        if license and license.license_type in ['premium', 'premium_plus']:
            date = request.data.get('date')
            
            if not date:
                return Response({'error': 'date is required.'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                latest_exercise_date = (
                    Exercise.objects.filter(account=account.id)
                    .aggregate(max_date=Max('date'))
                    .get('max_date')
                )
                latest_exercises = Exercise.objects.filter(account=account.id, date=latest_exercise_date).order_by('id')

                new_exercises = []
                for exercise in latest_exercises:
                    exercise_data = {
                        'workout':exercise.workout.id,
                        'mins':exercise.mins,
                        'date': date,
                        'account': exercise.account.id,
                    }
                    
                    serializer = CreateExerciseSerializer(data=exercise_data)
                    if serializer.is_valid():
                        new_exercise = serializer.save()
                        new_exercises.append(new_exercise)
                    else:
                        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                new_exercises_data = GetExerciseSerializer(new_exercises, many=True).data
                
                return Response({'message': 'Exercises created successfully!', 'data': new_exercises_data}, status=status.HTTP_201_CREATED)
            
            except Exception as e:
                return Response({'error': 'An error occurred while creating exercises.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error':'Sorry, this function is for premium.'}, status=status.HTTP_400_BAD_REQUEST)
