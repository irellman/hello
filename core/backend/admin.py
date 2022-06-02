from django.contrib import admin

from backend.Models.RecentSearch import RecentSearch
from backend.Models.User import User
from backend.Models.Post import Post
from backend.Models.Image import Image
from backend.Models.Comment import Comment
from backend.Models.Saved import Saved
from backend.Models.Collection import Collection

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Saved)
admin.site.register(Image)
admin.site.register(Comment)
admin.site.register(RecentSearch)
admin.site.register(Collection)