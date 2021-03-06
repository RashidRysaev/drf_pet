from djangorestframework_camel_case.render import CamelCaseBrowsableAPIRenderer, CamelCaseJSONRenderer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .models import CustomUser
from .serializers import CustomUserSerializer, CustomUserSerializerSuperStuff


class CustomUserCustomViewSet(ModelViewSet):
    queryset = CustomUser.objects.get_queryset().order_by("id")
    # serializer_class = CustomUserSerializer
    renderer_classes = [CamelCaseJSONRenderer, CamelCaseBrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == "2.0":
            return CustomUserSerializerSuperStuff
        else:
            return CustomUserSerializer
