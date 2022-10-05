import json
from msilib.schema import ServiceInstall
from tokenize import group
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from .serializer import BlogPostSerializer
# Create your views here.


@api_view(['POST'])
def blog_post_create_api(request):
    print (request)
    serializer = BlogPostSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    
    return Response({})

