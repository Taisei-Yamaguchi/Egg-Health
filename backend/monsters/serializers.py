from rest_framework import serializers
from .models import Monster, MonsterSelected
from django.core.exceptions import ValidationError

class MonsterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monster
        fields = '__all__'
        
class MonsterCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monster
        fields = '__all__'
    def validate(self, data):
        instance = Monster(**data)
        instance.clean()
        return data
        
class MonsterSelectedSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonsterSelected
        fields = '__all__'

class UpdateMonsterSelectedSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonsterSelected
        fields = '__all__'
        read_only_fields = ['id', 'account']
        
