from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from todoapp.views import ProjectModelViewSet, TodoModelViewSet
from userapp.views import CustomUserModelViewSet

router = DefaultRouter()
router.register("users", CustomUserModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todos", TodoModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/", include(router.urls)),
]
