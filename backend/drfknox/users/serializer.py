from django.contrib.auth.models import User
from rest_framework import serializers, validators

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        
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