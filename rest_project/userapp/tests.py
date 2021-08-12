from mixer.backend.django import mixer
from mixer.mix_types import URL
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase, force_authenticate

from .models import CustomUser
from .views import CustomUserCustomViewSet


class TestCustomUser(APITestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/authors/")
        view = CustomUserCustomViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post("/api/users/", {"username": "JohnSmith", "email": "johnsmith@mail.io"}, format="json")
        view = CustomUserCustomViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post("/api/users/", {"username": "JohnSmith", "email": "johnsmith@mail.io"}, format="json")
        admin = mixer.blend(CustomUser)
        force_authenticate(request, admin)
        view = CustomUserCustomViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = mixer.blend(CustomUser)
        client = APIClient()
        response = client.get(f"/api/users/{user.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
