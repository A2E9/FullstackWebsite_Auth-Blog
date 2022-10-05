from datetime import date
from django.contrib.auth.models import User
from rest_framework import serializers, validators
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogPost
        fields = '__all__'
        

        
    # def create(self, validated_data):
        
    #     return super().create(validated_data)