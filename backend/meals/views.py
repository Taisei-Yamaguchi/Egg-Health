from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Meal,FatSecretFood, Food, FoodOften, MealSet, MealPre
from .serializers import (
    FoodSerializer,
    FoodUpdateSerializer,
    MealSerializer, 
    GetMealSerializer,
    MealUpdateSerializer,
    FatSecretFoodSerializer,
    FoodOftenSerializer,
    FoodOftenCheckSerializer,
    MealSetSerializer,
    MealPreSerializer,
    MealPreCreateSerializer,
    MealPreUpdateSerializer,
    GetMealPreSerializer
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

# Create Meal with Food
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
        

class ToggleFoodOftenAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        account = request.user
        food_id = request.data.get('food_id')
        fatsecret_food_id = request.data.get('fatsecret_food_id')

        if food_id:
            food = get_object_or_404(Food, id=food_id)
            if food.account and food.account != account:
                return Response({"error": "You cannot use food items that do not belong to your account."},
                                status=status.HTTP_400_BAD_REQUEST)
            food_often, created = FoodOften.objects.get_or_create(account=account, food=food, defaults={'fatsecret_food': None})
            if not created:
                food_often.delete()
                return Response({"message": "Food often removed"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Food often added"}, status=status.HTTP_201_CREATED)

        elif fatsecret_food_id:
            fatsecret_food = get_object_or_404(FatSecretFood, id=fatsecret_food_id)
            food_often, created = FoodOften.objects.get_or_create(account=account, fatsecret_food=fatsecret_food, defaults={'food': None})
            if not created:
                food_often.delete()
                return Response({"message": "FatSecret food often removed"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "FatSecret food often added"}, status=status.HTTP_201_CREATED)

        return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)
    
class FoodOftenCheckAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        account = request.user
        try:
            food_often_list = FoodOften.objects.filter(account=account)
            serializer = FoodOftenCheckSerializer(food_often_list, many=True)
            return Response({'message': 'Get often foods successfully!', 'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching often foods check.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FoodOftenListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        account = request.user
        try:
            food_often_list = FoodOften.objects.filter(account=account)
            serializer = FoodOftenSerializer(food_often_list, many=True)
            serialized_data = serializer.data

            result = []
            for item in serialized_data:
                if item['food']:
                    result.append(item['food'])
                elif item['fatsecret_food']:
                    result.append(item['fatsecret_food'])

            return Response({'message': 'Get often foods successfully!', 'data': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching often foods.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# create MealSet
class CreateMealSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = request.user
        request.data['account'] = account.id
        serializer = MealSetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Meal Set created successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Delete Meal Set
class DeleteMealSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, meal_set_id):
        try:
            meal_set = MealSet.objects.get(pk=meal_set_id)
            if request.user == meal_set.account:
                meal_set.delete()
                return Response({'message': 'Meal Set deleted successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'You do not have permission to delete this meal set.'}, status=status.HTTP_403_FORBIDDEN)
        except MealSet.DoesNotExist:
            return Response({'error': 'Meal Set not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# update meal set
class UpdateMealSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, meal_set_id):
        user = self.request.user
        meal_set = get_object_or_404(MealSet, id=meal_set_id, account=user.id)
        serializer = MealSetSerializer(instance=meal_set, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Meal Set updated successfully!','data':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Create MealPre with Food or FatSecretFood by designating meal_set
class CreateMealPreAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = self.request.user
        request.data['account'] = account.id
        serializer = MealPreCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'MealPre created successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Delete Meal Pre
class DeleteMealPreAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, meal_pre_id):
        try:
            meal_pre = MealPre.objects.get(pk=meal_pre_id)
            if request.user == meal_pre.account:
                meal_pre.delete()
                return Response({'message': 'Meal Pre deleted successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'You do not have permission to delete this meal pre.'}, status=status.HTTP_403_FORBIDDEN)
        except MealPre.DoesNotExist:
            return Response({'error': 'Meal Pre not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# update meal pre, mainly serving and grams.
class UpdateMealPreAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, meal_pre_id):
        user = self.request.user
        meal_pre = get_object_or_404(MealPre, id=meal_pre_id, account=user.id)
        serializer = MealPreUpdateSerializer(instance=meal_pre, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Meal Pre updated successfully!','data':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Get MealPre By meal_set_id
class GetMealSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, meal_set_id):
        account = self.request.user
        if meal_set_id is None:
            return Response({'error': 'meal_set_id parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            meal_set = MealSet.objects.get(id=meal_set_id, account=account)
            meal_pres = MealPre.objects.filter(meal_set=meal_set_id,account=account.id).order_by('id')
            serializer=GetMealPreSerializer(meal_pres,many=True)
            return Response({
                'message': 'Get meal set successfully!',
                'data': {
                    'meal_set_id': meal_set.id,
                    'meal_set_name': meal_set.name,
                    'meal_pres': serializer.data
                }
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching meal set.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Create Meals with MealSet
class CreateMealsWithMealSetAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        account = self.request.user
        meal_type = request.data.get('meal_type')
        date = request.data.get('date')
        meal_set_id = request.data.get('meal_set_id')

        if not meal_type or not date or not meal_set_id:
            return Response({'error': 'meal_type, date and meal_set_id are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            meal_set = MealSet.objects.get(id=meal_set_id, account=account)
            meal_pres_list = MealPre.objects.filter(meal_set=meal_set, account=account)
            
            created_meals = []
            for meal_pre in meal_pres_list:
                meal_data = {
                    'account': account.id,
                    'meal_type': meal_type,
                    'date': date,
                    'food': meal_pre.food.id if meal_pre.food else None,
                    'fat_secret_food': meal_pre.fat_secret_food.id if meal_pre.fat_secret_food else None,
                    'servings': meal_pre.servings,
                    'grams': meal_pre.grams
                }
                serializer = MealSerializer(data=meal_data)
                if serializer.is_valid():
                    created_meal = serializer.save()
                    created_meals.append(serializer.data)
                else:
                    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Meals added successfully!', 'data': created_meals}, status=status.HTTP_201_CREATED)
        except MealSet.DoesNotExist:
            return Response({'error': 'Meal set not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'An error occurred while creating meals.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# Get MealSet List
class GetMealSetListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = self.request.user
        try:
            meal_sets = MealSet.objects.filter(account=account)
            response_data = []

            for meal_set in meal_sets:
                meal_pres = MealPre.objects.filter(meal_set=meal_set, account=account).order_by('id')
                serializer = GetMealPreSerializer(meal_pres, many=True)
                response_data.append({
                    'meal_set_id': meal_set.id,
                    'meal_set_name': meal_set.name,
                    'meal_pres': serializer.data
                })

            return Response({'message': 'Get meal sets successfully!', 'data': response_data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching meal sets.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

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


# Create Meal with Latest History
class CreateMealsWithLatestHistory(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        account = self.request.user
        meal_type = request.data.get('meal_type')
        date = request.data.get('date')
        
        if not meal_type or not date:
            return Response({'error': 'meal_type, date are required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            latest_meal_date = (
                Meal.objects.filter(meal_type=meal_type, account=account.id)
                .aggregate(max_date=Max('date'))
                .get('max_date')
            )
            latest_meals = Meal.objects.filter(meal_type=meal_type, account=account.id, date=latest_meal_date).order_by('id')

            new_meals = []
            for meal in latest_meals:
                meal_data = {
                    'food': meal.food.id if meal.food else None,
                    'fat_secret_food': meal.fat_secret_food.id if meal.fat_secret_food else None,
                    'servings': meal.servings,
                    'grams': meal.grams,
                    'date': date,
                    'meal_type': meal.meal_type,
                    'account': meal.account.id,
                }
                
                serializer = MealSerializer(data=meal_data)
                if serializer.is_valid():
                    new_meal = serializer.save()
                    new_meals.append(new_meal)
                else:
                    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            new_meals_data = MealSerializer(new_meals, many=True).data
            return Response({'message': 'Meals created successfully!', 'data': new_meals_data}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({'error': 'An error occurred while creating meals.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
