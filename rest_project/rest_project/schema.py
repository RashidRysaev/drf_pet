import graphene
from graphene_django import DjangoObjectType

from todoapp.models import Project, Todo
from userapp.models import CustomUser


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ["id", "content", "is_active", "project", "user"]


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = ["title", "url_link", "users"]


class CustomUser(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = ["username", "first_name", "last_name", "email"]


class Query(graphene.ObjectType):
    all_todo_notes = graphene.List(TodoType)

    def resolve_all_todo_notes(root, info):
        return Todo.objects.all()


schema = graphene.Schema(query=Query)
