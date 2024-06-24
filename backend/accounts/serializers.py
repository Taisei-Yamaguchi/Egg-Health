from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['nickname', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        nickname = validated_data.pop('nickname', None)
        
        # Update instance fields with the validated data
        instance = super().update(instance, validated_data)
        
        # Update nickname if provided
        if nickname is not None:
            instance.nickname = nickname
        
        # Update password if provided
        if password is not None:
            instance.set_password(password)
        
        instance.save()
        return instance
