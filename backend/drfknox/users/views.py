import json
from msilib.schema import ServiceInstall
from tokenize import group
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from .serializer import RegisterSerializer

@api_view(['POST'])
def login_api(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    
    _, token = AuthToken.objects.create(user)
    is_staff = user.is_staff
     
    return Response({
        'user_info':{
            'id': user.id,
            'username':user.username,
            'password':user.password,
            'email': user.email,
        },
        'token':token,
        'is_staff':is_staff,
    })   
    

@api_view(['GET'])
def get_user_data(request):
    user = request.user
    
    if user.is_authenticated:
         return Response({
        'user_info':{
            'id': user.id,
            'username':user.username,
            'email': user.email
        },
        
    })  
    return Response({'error': 'not autheticated'}, status=400)

@api_view(['POST'])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    user = serializer.save()
    _, token= AuthToken.objects.create(user)
    return Response({
        'user_info':{
            'id': user.id,
            'username':user.username,
            'email': user.email
        },
        'token':token
        
    })
    
