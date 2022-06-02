from django.db import models
import datetime

from .Post import Post
from .User import User
from .Collection import Collection

class Saved(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user+")
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post+")
  collection = models.ManyToManyField(Collection, blank=True, related_name="collection+")
  added_at = models.DateTimeField(default=datetime.datetime.now)
  
  def __str__(self):
    return self.user.username