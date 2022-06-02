from django.db import models
import datetime

from .Post import Post
from .User import User


class Collection(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name="user+")
    name = models.CharField(max_length=32)

    def __str__(self):
        return str(self.pk)