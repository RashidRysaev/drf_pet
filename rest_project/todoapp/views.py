from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter
from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer


class ProjectLimitOffserPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffserPagination
    filterset_class = ProjectFilter


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = TodoLimitOffsetPagination
    filterset_fields = ["project"]

    def destroy(self, request, *args, **kwargs):
        todo_note = self.get_object()
        todo_note.is_active = False
        todo_note.save()

        return Response(data="Deactivated!")
