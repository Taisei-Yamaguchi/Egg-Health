from django.urls import path
from .views import (
    GetMonsterAPIView,
    UpdateSelectedMonsterAPIView,
    GetMonsterListAPIView,
    CreateMonsterAPIView
)
urlpatterns = [
    path('get-monster/', GetMonsterAPIView.as_view(), name='get-monster'),
    path('update-monster-selected/', UpdateSelectedMonsterAPIView.as_view(), name='update-monster-selected'),
    path('get-monster-list/', GetMonsterListAPIView.as_view(), name='get-monster-list'),
    path('create-monster/', CreateMonsterAPIView.as_view(), name='create-monster'),
    
]
