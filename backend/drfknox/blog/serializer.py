from datetime import date
from django.contrib.auth.models import User
from rest_framework import serializers, validators
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = '__all__'

    def get_created_by(self, obj):
        user = obj.user
        return {'first_name': user.first_name, 'last_name': user.last_name, 
                'username': user.username, 'is_staff': user.is_active, 
                'date_joined': user.date_joined, 'last_login': user.last_login, 
                'email': user.email}
