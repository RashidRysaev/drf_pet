from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from userapp.serializers import CustomUserSerializer

from .models import Project, Todo


class ProjectSerializer(ModelSerializer):
    # users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ["id", "title", "url_link", "users"]


class TodoSerializer(ModelSerializer):
    project = ProjectSerializer()
    user = CustomUserSerializer()

    class Meta:
        model = Todo
        exclude = ["created", "updated"]
