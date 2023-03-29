from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.utils import timezone
 
class BlogPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)#user_id_id
    body = models.CharField(default='', max_length=200)
    date = models.DateTimeField(default=timezone.now)
    
    
    def __str__(self):
        return self.body
    

