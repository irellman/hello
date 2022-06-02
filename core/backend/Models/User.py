from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import datetime
import os
from uuid import uuid4

def path_and_rename(instance, filename):
  ext = filename.split('.')[-1]
  # set filename as random string
  filename = '{}.{}'.format(uuid4().hex, ext)
  # return the whole path to the file
  return os.path.join(instance.directory_string_var, filename)

class CustomAccountManager(BaseUserManager):
  def create_superuser(self, email, username, password, **other_fields):
    other_fields.setdefault('is_staff', True)
    other_fields.setdefault('is_superuser', True)
    other_fields.setdefault('is_active', True)
    return self.create_user(email, username.lower(), password, **other_fields)

  def create_user(self, email, username, password, **other_fields):
    email = self.normalize_email(email)
    user = self.model(email=email, username=username, **other_fields)
    user.set_password(password)
    user.save()
    return user
    

class User(AbstractBaseUser, PermissionsMixin):
  email = models.CharField(max_length=60, unique=True)
  avatar = models.ImageField(upload_to=path_and_rename, default="/static/media/avatars/default.png", blank=True)
  directory_string_var = "static/media/avatars/"
  name = models.CharField(max_length=60, blank=True)
  username = models.CharField(max_length=32)
  about = models.TextField(blank=True)
  followers = models.IntegerField(default=0)
  likes = models.IntegerField(default=0)
  website = models.CharField(max_length=255, blank=True, null=True)
  saved = models.ManyToManyField(to="backend.Post", blank=True)
  subscribers = models.ManyToManyField("User", blank=True)

  is_staff = models.BooleanField(default=False)
  is_active = models.BooleanField(default=False)
  
  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = ["username"]
  
  objects = CustomAccountManager()
  
  def __str__(self):
    return self.username