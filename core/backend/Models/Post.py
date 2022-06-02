from django.db import models
import datetime
from .User import User
from .Image import Image

class Post(models.Model):
  images = models.ManyToManyField(Image)
  description = models.TextField(blank=True, null=True)
  tags = models.TextField(blank=True, null=True)
  like_count = models.IntegerField(default=0)
  comment_count = models.IntegerField(default=0)
  published_at = models.DateTimeField(default=datetime.datetime.now)
  publisher = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

  likers = models.ManyToManyField(User, related_name="likers", blank=True)

  def __str__(self):
    return str(self.pk)