from .models import User, Drugs, DrugsInfo
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
