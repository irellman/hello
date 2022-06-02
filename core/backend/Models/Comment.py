from django.db import models
import datetime

from .Post import Post
from .User import User

class Comment(models.Model):
  post = models.ForeignKey(Post, blank=True, null=True, on_delete=models.CASCADE)
  user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
  answer_to = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE)
  text = models.TextField()
  published_at = models.DateTimeField(default=datetime.datetime.now)
  likes = models.IntegerField(default=0)
  likers = models.ManyToManyField(User, blank=True, related_name="users who liked this comment+")
  
  def __str__(self):
    return self.text