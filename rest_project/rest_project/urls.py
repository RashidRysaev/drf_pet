from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter, SimpleRouter

from todoapp.views import ProjectModelViewSet, TodoModelViewSet
from userapp.views import CustomUserCustomViewSet

router = DefaultRouter()

router.register("users", CustomUserCustomViewSet)  # basename='user' raises an error with two others!
router.register("projects", ProjectModelViewSet)
router.register("todos", TodoModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api-token-auth/", obtain_auth_token),
    path("api/", include(router.urls)),
]
