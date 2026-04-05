from django.urls import path
from .views import (
    home,
    RegisterView,
    LoginView,
    CategoryListView,
    SubCategoryListView,
    QuestionListView,
    ResultCreateView,
    LeaderboardView,
)

urlpatterns = [
    path("", home, name="home"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("categories/", CategoryListView.as_view(), name="categories"),
    path("categories/<int:category_id>/subcategories/", SubCategoryListView.as_view(), name="subcategories"),
    path("subcategories/<int:subcategory_id>/questions/", QuestionListView.as_view(), name="questions"),

    # save result
    path("result/", ResultCreateView.as_view(), name="result-create"),

    # leaderboard data
    path("leaderboard/", LeaderboardView.as_view(), name="leaderboard"),
]