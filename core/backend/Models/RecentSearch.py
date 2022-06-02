from django.db import models

from .User import User

from datetime import datetime

class RecentSearch(models.Model):
  user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name="who was desired+")
  owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="how make search+")
  search_at = models.DateTimeField(default=datetime.now())
  
  def __str__(self):
    return str(self.pk)