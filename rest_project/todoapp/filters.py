from django.db.models import fields
from django_filters import rest_framework as filter

from .models import Project


class ProjectFilter(filter.FilterSet):
    title = filter.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = [
            "title",
        ]
