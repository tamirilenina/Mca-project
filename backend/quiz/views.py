from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Category, SubCategory, Question, Result
from .serializers import (
    RegisterSerializer,
    CategorySerializer,
    SubCategorySerializer,
    QuestionSerializer,
    ResultSerializer,
)


@api_view(["GET"])
def home(request):
    return Response({"message": "Quiz Backend Running Successfully"})


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            return Response(
                {
                    "message": "Login successful",
                    "user_id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SubCategoryListView(generics.ListAPIView):
    serializer_class = SubCategorySerializer

    def get_queryset(self):
        category_id = self.kwargs["category_id"]
        return SubCategory.objects.filter(category_id=category_id)


class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        subcategory_id = self.kwargs["subcategory_id"]
        return Question.objects.filter(subcategory_id=subcategory_id)


class ResultCreateView(generics.CreateAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer


class LeaderboardView(generics.ListAPIView):
    serializer_class = ResultSerializer
    queryset = Result.objects.all().order_by("-score", "-taken_at")