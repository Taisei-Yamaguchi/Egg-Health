from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DynamicDetail, StaticDetail, GoalDetail
from .serializers import (
    DynamicDetailSerializer, 
    UpdateDynamicDetailSerializer,
    GoalDetailSerializer,
    UpdateGoalDetailSerializer,
    GetStaticDetailSerializer,
    CreateStaticDetailSerializer,
    UpdateStaticDetailSerializer
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.db.models import Max
from meals.models import Meal
from exercises.models import Exercise
from django.db.models import Sum
from datetime import datetime, timedelta

# create or update dynamicdetail
class CreateUpdateDynamicDetailAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = self.request.user
        date = request.data.get('date')
        # Check if DynamicDetail already exists for the given account and date
        dynamic_detail = DynamicDetail.objects.filter(account=account, date=date).first()
        if dynamic_detail:
            # If DynamicDetail exists, update it with new data
            serializer = UpdateDynamicDetailSerializer(dynamic_detail, data=request.data)
        else:
            # If DynamicDetail does not exist, create a new one
            request.data['account'] = account.id
            serializer = DynamicDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Weights and Body Fat saved successfully!', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
# Get DynamicDetail by Date
class GetDynamicDetailByDateAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, date):
        account = self.request.user
        if date is None:
            return Response({'error': 'date\ parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            dynamic_detail = DynamicDetail.objects.filter(date=date, account=account.id).first()
            if dynamic_detail is None:
                return Response({'message': 'No DynamicDetail found for the given date.'}, status=status.HTTP_404_NOT_FOUND)
            serializer = DynamicDetailSerializer(dynamic_detail)
            return Response({'message': 'Get Weight and Body Fat successfully!', 'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching weight and body fat.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# create or update goal detail
class CreateUpdateGoalDetailAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = self.request.user
        # Check if GoalDetail already exists for the given account
        goal_detail = GoalDetail.objects.filter(account=account).first()
        if goal_detail:
            # If GoalDetail exists, update it with new data
            serializer = UpdateGoalDetailSerializer(goal_detail, data=request.data)
        else:
            # If GoalDetail does not exist, create a new one
            request.data['account'] = account.id
            serializer = GoalDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Goal saved successfully!', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
# Get GoalDetail
class GetGoalDetailAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        try:
            goal_detail =GoalDetail.objects.filter(account=account.id).first()
            if goal_detail is None:
                return Response({'message': 'No Goal yet','data': None}, status=status.HTTP_404_NOT_FOUND)
            serializer = GoalDetailSerializer(goal_detail)
            return Response({'message': 'Get Goal successfully!', 'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching goal.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# create or update static detail
class CreateUpdateStaticDetailAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = self.request.user
        # Check if StaticDetail already exists for the given account
        static_detail = StaticDetail.objects.filter(account=account).first()
        if static_detail:
            # If StaticDetail exists, update it with new data
            serializer = UpdateStaticDetailSerializer(static_detail, data=request.data)
        else:
            # If StaticDetail does not exist, create a new one
            request.data['account'] = account.id
            serializer = CreateStaticDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Static Detail saved successfully!', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
# Get StaticDetail
class GetStaticDetailAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        try:
            static_detail =StaticDetail.objects.filter(account=account.id).first()
            if static_detail is None:
                return Response({'message': 'No Static yet', 'data': None}, status=status.HTTP_404_NOT_FOUND)
            serializer = GetStaticDetailSerializer(static_detail)
            return Response({'message': 'Get Static Detail successfully!', 'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching static detail.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Get Dynamic Data for Graph
class GetDynamicAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        try:
            dynamic_details = DynamicDetail.objects.filter(account=account.id).order_by('date')
            serializer = DynamicDetailSerializer(dynamic_details, many=True)
            return Response({'message': 'Get Weight and Body Fat successfully!', 'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching weight and body fat.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Get Meal Sum of Intake Cal per date for Graph
class MealIntakeSummaryAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = request.user
        try:
            meals = (
                Meal.objects.filter(account=account)
                .values('date')
                .annotate(sum_intake_cal=Sum('intake_cal'))
                .order_by('-date')[:10] 
            )
            meals = list(meals)[::-1]
            return Response({'message': 'Get meal intake data successfully!','data': list(meals)}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching meal intake data.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# Get Exercise Sum of Consume Cal per date for Graph
class ExerciseConsumeSummaryAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = request.user
        try:
            # Get BMR and other_cal from StaticDetail
            bmr = 0
            other_cal = 0
            static_detail = StaticDetail.objects.filter(account=account).first()
            if static_detail is not None:
                bmr = static_detail.bmr if static_detail.bmr is not None else 0

                active_level_multipliers = {
                    'very low': 0.03,
                    'low': 0.05,
                    'middle': 0.07,
                    'high': 0.1,
                    'very high': 1.2
                }
                active_level = static_detail.active_level
                other_cal = bmr * active_level_multipliers.get(active_level, 0)
            
            # Get exercise data and add BMR and other calories
            exercises = (
                Exercise.objects.filter(account=account)
                .values('date')
                .annotate(sum_exercise_cal=Sum('consume_cal'))
                .order_by('-date')[:10] 
            )

            exercises = list(exercises)[::-1]
            data = []
            for exercise in exercises:
                date = exercise['date']
                
                # Get meal data for the same date
                meal = (
                    Meal.objects.filter(account=account, date=date)
                    .aggregate(sum_intake_cal=Sum('intake_cal'))
                )
                
                # Calculate TEF as 10% of the total intake calories
                tef_cal = meal['sum_intake_cal'] * 0.1 if meal['sum_intake_cal'] is not None else 0

                total_cal = exercise['sum_exercise_cal'] + bmr + tef_cal + other_cal
                data.append({
                    'date': date,
                    'sum_exercise_cal': total_cal
                })
            
            return Response({'message': 'Get exercise consume data successfully!', 'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching exercise consume data.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
# Get BMR
class GetBMRAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        try:
            static_detail =StaticDetail.objects.filter(account=account.id).first()
            if static_detail is None or static_detail.bmr is None:
                return Response({'message': "You don't have BMR!", 'data': None}, status=status.HTTP_404_NOT_FOUND)
            data = {
                'bmr': static_detail.bmr,
                'active_level': static_detail.active_level
            }
            return Response({'message': 'Get BMR successfully!', 'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching BMR.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Get Exercise & Meal Cal per date for Graph
class ExerciseMealCalSummaryAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = request.user
        try:
            meals = (
                Meal.objects.filter(account=account)
                .values('date')
                .annotate(sum_intake_cal=Sum('intake_cal'))
                .order_by('-date')[:10] 
            )
                
            meals = list(meals)[::-1]
            data = []
            for meal in meals:
                exercise = (
                    Exercise.objects.filter(account=account, date=meal['date'])
                    .aggregate(sum_exercise_cal=Sum('consume_cal'))
                )
                data.append({
                    'date': meal['date'],
                    'sum_intake_cal': meal['sum_intake_cal'],
                    'sum_exercise_cal': exercise['sum_exercise_cal'] if exercise['sum_exercise_cal'] is not None else 0
                })
            return Response({'message': 'Get exercise consume data successfully!','data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching exercise consume data.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Get Latest Weight
class GetLatestWeightAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = self.request.user
        try:
            dynamic_detail = DynamicDetail.objects.filter(account=account.id, weight__isnull=False).order_by('-date').first()
            
            if dynamic_detail is None:
                return Response({'message': 'No DynamicDetail found for the given criteria.', 'data': None}, status=status.HTTP_404_NOT_FOUND)
            
            return Response({'message': 'Get Latest Weight successfully!', 'data': dynamic_detail.weight}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': 'An error occurred while fetching latest weight.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get Daily cals & nutrients
class DailyCalsNutrientsAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, date):
        if date is None:
            return Response({'error': 'date parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        account = request.user
        try:
            # Filter meals by account and date, and annotate with sum of nutrients
            meal_data = Meal.objects.filter(account=account, date=date).aggregate(
                sum_intake_cal=Sum('intake_cal'),
                sum_intake_protein=Sum('intake_protein'),
                sum_intake_fat=Sum('intake_fat'),
                sum_intake_carbs=Sum('intake_carbs')
            )
            
            # Filter exercises by account and date, and annotate with sum of exercise calories
            exercise_data = Exercise.objects.filter(account=account, date=date).aggregate(
                sum_exercise_cal=Sum('consume_cal')
            )

            # Retrieve BMR and active level from StaticDetail
            try:
                static_detail = StaticDetail.objects.get(account=account)
                bmr = static_detail.bmr if static_detail.bmr is not None else 0
                active_level = static_detail.active_level
            except StaticDetail.DoesNotExist:
                bmr = 0
                active_level = None

            # If there are no meals found, set sums to 0
            if not meal_data or meal_data['sum_intake_cal'] is None:
                meal_data = {
                    'sum_intake_cal': 0,
                    'sum_intake_protein': 0,
                    'sum_intake_fat': 0,
                    'sum_intake_carbs': 0
                }

            # If there are no exercises found, set sums to 0
            if not exercise_data or exercise_data['sum_exercise_cal'] is None:
                exercise_data = {
                    'sum_exercise_cal': 0
                }

            # Calculate other_cal based on active_level
            active_level_multipliers = {
                'very low': 0.03,
                'low': 0.05,
                'middle': 0.07,
                'high': 0.1,
                'very high': 1.2
            }
            other_cal = bmr * active_level_multipliers.get(active_level, 0)

            # Calculate total_consume_cal
            tef = meal_data['sum_intake_cal'] * 0.1
            total_consume_cal = exercise_data['sum_exercise_cal'] + bmr + tef + other_cal

            # Combine meal data, exercise data, and total_consume_cal into one response object
            response_data = {
                **meal_data,
                'total_consume_cal': total_consume_cal
            }

            return Response({'message': 'Get meal and exercise data successfully!', 'data': response_data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching meal and exercise data.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# check meal, exercise , dynamic input by date
class CheckInputByDateAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, date):
        if date is None:
            return Response({'error': 'date parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        account = request.user
        try:
            # Check for Meal inputs
            check_breakfast = Meal.objects.filter(account=account, date=date, meal_type='Breakfast').exists()
            check_lunch = Meal.objects.filter(account=account, date=date, meal_type='Lunch').exists()
            check_dinner = Meal.objects.filter(account=account, date=date, meal_type='Dinner').exists()
            check_snack = Meal.objects.filter(account=account, date=date, meal_type='Snack').exists()
            
            # Check for Exercise inputs
            check_exercise = Exercise.objects.filter(account=account, date=date).exists()

            # Check for DynamicDetail inputs
            dynamic_detail = DynamicDetail.objects.filter(account=account, date=date).first()
            if dynamic_detail:
                check_weight = dynamic_detail.weight is not None
                check_body_fat = dynamic_detail.body_fat is not None
            else:
                check_weight = False
                check_body_fat = False

            response_data = {
                'check_breakfast': check_breakfast,
                'check_lunch': check_lunch,
                'check_dinner': check_dinner,
                'check_snack': check_snack,
                'check_exercise': check_exercise,
                'check_weight': check_weight,
                'check_body_fat': check_body_fat
            }

            return Response({'message': 'Get input data successfully!', 'data': response_data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching input data.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CheckInputByMonthAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, month):
        if month is None:
            return Response({'error': 'Month parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            year, month = map(int, month.split('-'))
            start_date = datetime(year, month, 1)
            next_month = start_date + timedelta(days=32)
            next_month = next_month.replace(day=1)
            end_date = next_month - timedelta(days=1)

            account = request.user
            response_data = []

            current_date = start_date
            while current_date <= end_date:
                date_str = current_date.strftime('%Y-%m-%d')

                check_meal = Meal.objects.filter(account=account, date=current_date).exists()
                check_exercise = Exercise.objects.filter(account=account, date=current_date).exists()

                dynamic_detail = DynamicDetail.objects.filter(account=account, date=current_date).first()
                check_weight = dynamic_detail is not None and dynamic_detail.weight is not None

                response_data.append({
                    'date': date_str,
                    'meal': check_meal,
                    'exercise': check_exercise,
                    'weight': check_weight,
                })

                current_date += timedelta(days=1)

            return Response({'message': 'Get input data successfully!', 'data': response_data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching input data.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)