from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from .models import CustomUser


class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "first_name", "last_name", "email", "is_superuser"]
