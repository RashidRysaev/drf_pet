from os import name

from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from todoapp.views import ProjectModelViewSet, TodoModelViewSet
from userapp.views import CustomUserCustomViewSet

schema_view = get_schema_view(
    openapi.Info(
        title="rest_project",
        default_version="1.0",
        description="Docs to the project",
        contact=openapi.Contact(email="rrs@mail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

router = DefaultRouter()

router.register("users", CustomUserCustomViewSet)  # basename='user' raises an error with two others!
router.register("projects", ProjectModelViewSet)
router.register("todos", TodoModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api-token-auth/", obtain_auth_token),
    path("api/", include(router.urls)),
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),  # getting docs as .json / .yaml file
    path(
        "swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"
    ),  # getting docs via swagger_ui
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),  # getting docs via ReDoc
]
