from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.utils import timezone
 
class BlogPost(models.Model):
    id = models.AutoField(primary_key=True)
    # body = models.TextField(blank=True, default='')
    # autor = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    body = models.CharField(default='', max_length=200)
 
    def __str__(self):
        return self.body

