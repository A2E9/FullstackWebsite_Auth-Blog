from django.contrib.auth.models import User
from rest_framework import serializers, validators
from .models import BlogPost

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'is_superuser', 'last_login', 'date_joined')
        
        extra_kwargs = {
            "first_name": {"required": False},
            "last_name": {"required": False},
            "password": {"write_only": True},
            "email": {
                "required": False,
                # "allow_blank": False,
                "validators": [
                    # validators.UniqueValidator(
                    #     User.objects.all(), "A user with this Email already exists"
                    # )
                ]
            }
        }
        
    def create(self, validated_data):
        username = validated_data.get('username')
        #password = validated_data.get('password')
        email = validated_data.get('email')
        first_name = validated_data.get('first_name') or ''
        last_name = validated_data.get('last_name') or ''
        
        user = User.objects.create(
            username=username,
            # password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class BlogPostSerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField(many=False)
 
    class Meta:
        model = BlogPost
        fields = ('id', 'username', 'date', 'body')
        
    def create(self, validated_data):
        id = validated_data.get('id')
        username = validated_data.get('username')
        date = validated_data.get('date')
        body=validated_data.get('body')
        
        blogpost = BlogPost.objects.create(
            id = id,
            username=username,
            date=date,
            body=body,
        )
        blogpost.save()
        return blogpost
        
    # def create(self, validated_data):
        
    #     return super().create(validated_data)