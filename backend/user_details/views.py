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
            exercises = (
                Exercise.objects.filter(account=account)
                .values('date')
                .annotate(sum_exercise_cal=Sum('consume_cal'))
                .order_by('-date')[:10] 
            )
            
            exercises = list(exercises)[::-1]
            return Response({'message': 'Get exercise consume data successfully!','data': list(exercises)}, status=status.HTTP_200_OK)
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
