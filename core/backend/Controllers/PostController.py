from django.http import JsonResponse

from ..Models.Post import Post

from ..decorators.postLikeDecorator import postLikeDecorator
from ..decorators.postSaveDecorator import postSaveDecorator

from ..helpers.getPublishDate import getPublishedDate

@postLikeDecorator
def likePost(post, user):
  if post.likers.filter(pk=user.pk).first() is None:  
    post.likers.add(user)
    post.like_count = post.like_count + 1
    post.publisher.likes = post.publisher.likes + 1

@postLikeDecorator
def dislikePost(post, user):
  if post.likers.filter(pk=user.pk).first() is not None:  
    post.likers.remove(user)
    post.like_count = post.like_count - 1
    post.publisher.likes = post.publisher.likes - 1

@postSaveDecorator
def addToSaved(user, id):
  if user.saved.filter(pk=id).first() is None:  
    user.saved.add(id)

@postSaveDecorator
def deleteFromSaved(user, id):
  if user.saved.filter(pk=id).first() is not None:
    user.saved.remove(id)

def getPost(request, id):
  post = Post.objects.get(pk=id)
  
  json = {
    "id": post.id,
    "images": [],
    "description": post.description,
    "tags": post.tags,
    "likes": int(post.like_count),
    "commentsCount": post.comment_count,
    "isLiked": False,
    "isSaved": False,
    "published_at": getPublishedDate(post.published_at),
    "comments": [],
    "publisher": {
      "username": post.publisher.username,
      "avatar": post.publisher.avatar.url,
      "subscribe": False
    }
  }

  if request.user in post.publisher.subscribers.all():
    json["publisher"]["subscribe"] = True

  for img in post.images.all():
    json["images"].append(img.image.url)

  if post.likers.filter(pk=request.user.id).count():
    json["isLiked"] = True

  if request.user.id is not None:
    if request.user.saved.filter(pk=post.id).count() == 1:
      json["isSaved"] = True

  return JsonResponse(json, safe=False)