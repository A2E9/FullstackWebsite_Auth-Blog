from django.urls import path, re_path
from knox import views as knox_views
from . import views
from django.views.generic.base import TemplateView




urlpatterns = [
    path('blogpost/', views.blog_post_create_api),
    path('blogpostlist/', views.blog_post_list_api)
]