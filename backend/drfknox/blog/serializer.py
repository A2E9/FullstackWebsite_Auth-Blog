from datetime import date
from django.contrib.auth.models import User
from rest_framework import serializers, validators
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = '__all__'  # add user_id field to fields list

    def get_created_by(self, obj):
        return {'first_name': obj.user.first_name, 'last_name': obj.user.last_name, 
                'username': obj.user.username, 'is_staff': obj.user.is_active, 
                'is_staff': obj.user.is_active, 'date_joined': obj.user.date_joined,
                'last_login': obj.user.last_login, 'email': obj.user.email}


