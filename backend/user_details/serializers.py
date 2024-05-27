from rest_framework import serializers
from .models import DynamicDetail, StaticDetail, GoalDetail
from django.core.exceptions import ValidationError

class DynamicDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DynamicDetail
        fields = '__all__'

class UpdateDynamicDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DynamicDetail
        fields = '__all__'
        read_only_fields = ['id', 'account', 'date']
        
    def update(self, instance, validated_data):
        instance.weight = validated_data.get('weight', instance.weight)
        instance.body_fat = validated_data.get('body_fat', instance.body_fat)
        instance.save()
        return instance

class GoalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoalDetail
        fields = '__all__'

class UpdateGoalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoalDetail
        fields = '__all__'
        read_only_fields = ['id', 'account']
        
    def update(self, instance, validated_data):
        instance.goal_weight = validated_data.get('goal_weight', instance.goal_weight)
        instance.goal_body_fat = validated_data.get('goal_body_fat', instance.goal_body_fat)
        instance.goal_intake_cal = validated_data.get('goal_intake_cal', instance.goal_intake_cal)
        instance.goal_consume_cal = validated_data.get('goal_consume_cal', instance.goal_consume_cal)
        instance.save()
        return instance

class GetStaticDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaticDetail
        fields = '__all__'

class CreateStaticDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaticDetail
        fields = '__all__'
        
    def validate(self, data):
        static_detail = StaticDetail(**data) 
        try:
            static_detail.clean()  
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return data
    
class UpdateStaticDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaticDetail
        fields = '__all__'
        read_only_fields = ['id', 'account']
        
    def validate(self, data):
        static_detail = StaticDetail(**data)
        try:
            static_detail.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return data

    def update(self, instance, validated_data):
        instance.tall = validated_data.get('tall', instance.tall)
        instance.birthday = validated_data.get('birthday', instance.birthday)
        instance.sex = validated_data.get('sex', instance.sex)
        instance.bmr = validated_data.get('bmr', instance.bmr)
        instance.active_level = validated_data.get('active_level', instance.active_level)
        instance.save()
        return instance