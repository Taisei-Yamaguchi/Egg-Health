from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Meal,FatSecretFood, Food
from .serializers import (
    FoodSerializer,
    FoodUpdateSerializer,
    MealSerializer, 
    GetMealSerializer,
    MealUpdateSerializer,
    FatSecretFoodSerializer
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.db.models import Max
from .helpers.prepare_fatsecret_search import prepare_fatsecret_search_request
import requests
from .helpers.modify_fatsecret_food_data import modify_fatsecret_food_data

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

# get food history only search
class GetFoodHistoryAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = self.request.user
        try:
            user_meals = Meal.objects.filter(account=account, food__isnull=True, fat_secret_food__isnull=False).order_by('-date')
            serializer = GetMealSerializer(user_meals, many=True)
            food_history = [meal['fat_secret_food'] for meal in serializer.data if meal['fat_secret_food'] is not None]
            
            unique_food_history = []
            seen_ids = set()
            for fat_secret_food in food_history:
                fat_secret_food_id = fat_secret_food['food_id']
                if fat_secret_food_id not in seen_ids:
                    unique_food_history.append(fat_secret_food)
                    seen_ids.add(fat_secret_food_id)
            
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


# FatSecret Search
class FatSecretSearchAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        search_key = self.request.query_params.get('search_key', None)
        # Check if search_key is provided
        if search_key is None or search_key.strip() == '/':
            return Response({'error': 'Search key is required and cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)

        # Make the signed API request
        url, params = prepare_fatsecret_search_request(search_key)
        response = requests.post(url, params=params)
        fatsecret_results = response.json()
        #  Check if the API request was successful
        if response.status_code == 200:
            results =[]
            for food in fatsecret_results.get('foods', {}).get('food', []):
                modified_fatsecret_result = modify_fatsecret_food_data(food)
                # Check if modified data is valid
                if modified_fatsecret_result is None:
                    continue
                
                # Check if fatSecretFood with same food_id already exists
                existing_fatsecret_food = FatSecretFood.objects.filter(food_id=modified_fatsecret_result['food_id']).first()
                if existing_fatsecret_food:
                    results.append(FatSecretFoodSerializer(existing_fatsecret_food).data)
                    continue
                
                # Create FatSecretFood model
                fatsecret_food_serializer = FatSecretFoodSerializer(data=modified_fatsecret_result)
                if fatsecret_food_serializer.is_valid():
                    fatsecret_food_serializer.save()
                    results.append(fatsecret_food_serializer.data)
                else:
                    # Log the validation error
                    print(f"Validation error for food: {modified_fatsecret_result['food_name']}, Errors: {fatsecret_food_serializer.errors}")
                
            return Response({'message': 'Search successfully!', 'data': results}, status=status.HTTP_200_OK)
        else:
            # Return an error response
            return Response({'error': 'Failed to fetch data from FatSecret API'}, status=response.status_code)