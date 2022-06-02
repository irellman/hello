from django.db import models
import os
from uuid import uuid4

def path_and_rename(instance, filename):
  ext = filename.split('.')[-1]
  filename = '{}.{}'.format(uuid4().hex, ext)
  return os.path.join(instance.directory_string_var, filename)

class Image(models.Model):
  image = models.ImageField(upload_to=path_and_rename)
  directory_string_var = "static/media/posts/"

  def __str__(self):
    return str(self.pk)