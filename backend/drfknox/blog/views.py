import json
from msilib.schema import ServiceInstall
from tokenize import group
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken

from blog.models import BlogPost
from .serializer import BlogPostSerializer
# Create your views here.


@api_view(['POST'])
def blog_post_create_api(request):
    print (request.data)
    serializer = BlogPostSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    return Response({"message": request.data})

@api_view(['GET'])
def blog_post_list_api(request):
    blog_posts = BlogPost.objects.all()
    serializer = BlogPostSerializer(blog_posts, many=True)
    return Response(serializer.data)
