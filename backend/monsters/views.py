from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Monster, MonsterSelected
from .serializers import (
    MonsterSelectedSerializer,
    MonsterSerializer,
    UpdateMonsterSelectedSerializer,
    MonsterCreateSerializer
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from monsters.tasks import calculate_grow_points
from license.models import License
from django.utils import timezone

# test batch
def run_task(request):
    calculate_grow_points.delay()
    return JsonResponse({'status': 'Task has been started'})

class GetMonsterAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account = self.request.user
        try:
            monster_selected = MonsterSelected.objects.filter(account=account).first()
            if not monster_selected:
                return Response({'message': 'No selected monster found'}, status=status.HTTP_404_NOT_FOUND)

            try:
                license = License.objects.get(account=account)
            except License.DoesNotExist:
                license = None

            if not license or license.license_type != 'premium_plus':
                monster_selected.selected_monster = 'Normal'
                monster_selected.save()

            monster_type = monster_selected.selected_monster
            monster = Monster.objects.filter(account=account, monster_type=monster_type).first()
            if not monster:
                return Response({'message': 'No Monster found'}, status=status.HTTP_404_NOT_FOUND)

            serialized_monster = MonsterSerializer(monster)
            return Response({
                'message': 'Get monster successfully!',
                'data': {
                    'monster': serialized_monster.data,
                    'selected_stage': monster_selected.selected_stage
                }
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching monster.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Change Monster Selected
class UpdateSelectedMonsterAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        account = request.user
        data = request.data

        try:
            monster_selected = get_object_or_404(MonsterSelected, account=account.id)
            serializer = UpdateMonsterSelectedSerializer(monster_selected, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Monster stage updated successfully!', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': 'An error occurred while updating monster.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Get Monster List
class GetMonsterListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        account = self.request.user
        try:
            monster_selected = MonsterSelected.objects.filter(account=account.id).first()
            
            normal_monster = Monster.objects.filter(account=account.id, monster_type='Normal').first()
            premium_monster = Monster.objects.filter(account=account.id, monster_type='Premium').first()
            cat_monster = Monster.objects.filter(account=account.id, monster_type='Cat').first()
            
            serialized_normal = MonsterSerializer(normal_monster)
            serialized_premium = MonsterSerializer(premium_monster)
            serialized_cat = MonsterSerializer(cat_monster)
            
            # check license
            try:
                license = License.objects.get(account= account.id)
            except License.DoesNotExist:
                license = None
            if not license or (license and license.license_type != 'premium_plus'):
                premium_monster = None
                cat_monster = None
                
            data = {
                'normal_monster': serialized_normal.data if normal_monster else None,
                'premium_monster': serialized_premium.data if premium_monster else None,
                'cat_monster': serialized_cat.data if cat_monster else None,
                'selected_stage': monster_selected.selected_stage if monster_selected else None,
                'selected_type': monster_selected.selected_monster if monster_selected else None
            }
            
            return Response({'message': 'Get monster successfully!', 'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred while fetching monster.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Create Monster
class CreateMonsterAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        account = request.user
        request.data['account'] = account.id
        serializer = MonsterCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'New Monster released successfully!','data':serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
