
from django.urls import path, re_path

from knox import views as knox_views
from . import views
from django.views.generic.base import TemplateView



urlpatterns = [

    path('login/', views.login_api),
    path('user/', views.get_user_data),
    path('register/', views.register_api),
    path('logout/', knox_views.LogoutView.as_view()),
    path('logoutall/', knox_views.LogoutAllView.as_view()),
    # re_path(r'^.*', TemplateView.as_view(template_name="home.html"), name="home")
    
]