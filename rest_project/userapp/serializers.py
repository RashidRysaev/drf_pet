from rest_framework.serializers import ModelSerializer

from .models import CustomUser


class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "first_name", "last_name", "email"]


class CustomUserSerializerSuperStuff(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "first_name", "last_name", "email", "is_superuser", "is_staff"]
