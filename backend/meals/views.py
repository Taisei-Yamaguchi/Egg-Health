from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Meal,Food
from .serializers import (
    FoodSerializer,
    FoodUpdateSerializer,
    MealSerializer, 
    GetMealSerializer,
    MealUpdateSerializer
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.db.models import Max

#Create Custom Food
class CreateCustomFoodAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = request.user
        request.data['account'] = account.id
        request.data['custom'] = True
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Custom Food added successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Get Only Custom Food
class CustomFoodListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            account = request.user
            custom_foods = Food.objects.filter(account=account.id, custom=True)
            serialized_foods = FoodSerializer(custom_foods, many=True)
            return Response({'message': 'Get Custom Food List successfully!', 'data': serialized_foods.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching custom foods.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Get Only Often Food
# class OftenFoodListAPIView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]
#     def get(self, request):
#         try:
#             account = request.user
#             custom_foods = Food.objects.filter(account=account.id, often=True)
#             serialized_foods = FoodSerializer(custom_foods, many=True)
#             return Response({'message': 'Get Custom Food List successfully!', 'data': serialized_foods.data}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': 'An error occurred while fetching custom foods.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# update food often
# class ToggleOftenFoodAPIView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]
#     def patch(self, request, food_id):
#         user = self.request.user
#         food = get_object_or_404(Food, id=food_id, account=user.id)
#         try:
#             food.often = not food.often
#             food.save()
#             return Response({'message': 'Food often status toggled successfully.'}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': 'An error occurred while toggle "often".', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Create Meal with Custom Food
class CreateMealAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = self.request.user
        request.data['account'] = account.id
        serializer = MealSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Meal added successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# get food history
class GetFoodHistoryAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        try:
            user_meals = Meal.objects.filter(account=account).order_by('-date')
            serializer = GetMealSerializer(user_meals, many=True)
            food_history = [meal['food'] for meal in serializer.data]
            unique_food_history = []
            seen_ids = set()
            for food in food_history:
                food_id = food['id']
                if food_id not in seen_ids:
                    unique_food_history.append(food)
                    seen_ids.add(food_id)
            return Response({'message': 'Get food history successfully!', 'data': unique_food_history}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while getting food history".', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Get Meal By Date and Type
class GetMealsAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, date, meal_type):
        account = self.request.user
        if date is None or meal_type is None:
            return Response({'error': 'date and meal_type parameter are required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            meals = Meal.objects.filter(date=date,meal_type=meal_type,account=account.id).order_by('id')
            serialized_meals=GetMealSerializer(meals,many=True)
            return Response({'message': 'Get meals successfully!', 'data': serialized_meals.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching meals.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# update meal, mainly serving and grams.
class UpdateMealAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, meal_id):
        user = self.request.user
        meal = get_object_or_404(Meal, id=meal_id, account=user.id)
        serializer = MealUpdateSerializer(instance=meal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Meal updated successfully!','data':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Meal Delete
class DeleteMealAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, meal_id):
        try:
            meal = Meal.objects.get(pk=meal_id)
            if request.user == meal.account:
                meal.delete()
                return Response({'message': 'Meal deleted successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'You do not have permission to delete this meal.'}, status=status.HTTP_403_FORBIDDEN)
        except Meal.DoesNotExist:
            return Response({'error': 'Meal not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Get latest Meals
class GetLatestMealsAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request,meal_type):
        account = self.request.user
        try:
            latest_meal_date = (
                Meal.objects.filter(meal_type=meal_type, account=account.id)
                .aggregate(max_date=Max('date'))
                .get('max_date')
            )
            meals = Meal.objects.filter(meal_type=meal_type,account=account.id,date=latest_meal_date).order_by('id')
            serialized_meals = GetMealSerializer(meals, many=True)
            return Response({'message': 'Get latest meals successfully!', 'data': serialized_meals.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching latest meals.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

