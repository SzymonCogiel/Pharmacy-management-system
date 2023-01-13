from .models import User, Drugs, DrugsInfo, PresInfo
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class DrugsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drugs
        fields = '__all__'


class DrugsInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugsInfo
        fields = '__all__'


class PresInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PresInfo
        fields = '__all__'
