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


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = ["username", "first_name", "last_name", "email"]


class Query(graphene.ObjectType):
    all_todo_notes = graphene.List(TodoType)

    all_projects = graphene.List(ProjectType)

    all_users = graphene.List(CustomUserType)
    users_by_project_title = graphene.List(CustomUserType, title=graphene.String(required=False))

    def resolve_all_todo_notes(root, info):
        return Todo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return CustomUser.objects.all()
    
    def resolve_users_by_project_title(self, info, title=None):
        user = CustomUser.objects.all()
        
        if title:
            user = user.filter(project__title=title)
        return user


schema = graphene.Schema(query=Query)
