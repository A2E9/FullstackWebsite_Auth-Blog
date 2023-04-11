from django.urls import path, include
from knox import views as knox_views
from . import views
from django.views.generic.base import TemplateView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('users', views.CurrentUserViewSet)

urlpatterns = [
    # path('dh/',views.get_user_data),
    path('login/', views.login_api),
    path('user/', views.get_user_data),
    path('register/', views.register_api),
    path('logout/', knox_views.LogoutView.as_view()),
    path('logoutall/', knox_views.LogoutAllView.as_view()),
    path('', include(router.urls))
]