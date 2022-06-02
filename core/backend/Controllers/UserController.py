import random
from django.http import JsonResponse
from ..Models.User import User
import os
from ..Models.Post import Post
from ..Models.Image import Image

from ..helpers.getPublishDate import getPublishedDate

def popular(request):
  users = []

  for user in User.objects.all()[:10]:
    user_json = {
      "id": user.id,
      "username": user.username,
      "name": user.name,
      "avatar": user.avatar.url,
      "followers": user.followers,
      "likes": user.likes,
      "postsCount": user.post_set.count(),
      "website": user.website,
      "posts": []
    }

    for post in user.post_set.order_by('-pk').all()[:3]:
      post_json = {
        "id": post.id,
        "images": post.images.all()[0].image.url
      }
      user_json["posts"].append(post_json)

    users.append(user_json)

  return JsonResponse(users, safe=False)

def getInfoAboutUser(request, username):
  user = User.objects.filter(username=username).first()

  result = {
    "id": user.id,
    "name": user.name,
    "username": user.username,
    "avatar": user.avatar.url,
    "about": user.about,
    "likes": user.likes,
    "followers": user.followers,
    "posts_count": user.post_set.count(),
    "subscribe": False,
    "website": user.website
  }

  if request.user in user.subscribers.all():
    result["subscribe"] = True

  return JsonResponse(result, safe=False)

def getUserPosts(request):
  user = User.objects.filter(username=request.POST.get("username")).first()
  page = int(request.POST.get("page"))
  posts = user.post_set.order_by('-pk').all()

  result = {
    "hasNextPage": False,
    "posts": []
  }

  if posts.count() - (page*12) > 12:
    result["hasNextPage"] = True

  for post in posts[page*12:page*12+12]:
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
      "publisher": {
        "username": post.publisher.username,
        "avatar": post.publisher.avatar.url
      }
    }

    for img in post.images.all():
      json["images"].append(img.image.url)

    if post.likers.filter(pk=request.user.id).count():
      json["isLiked"] = True

    if request.user.id is not None:
      if request.user.saved.filter(pk=post.id).count() == 1:
        json["isSaved"] = True

    result["posts"].append(json)

  return JsonResponse(result, safe=False)

def subscribe(request):
  username = request.POST.get("username")
  user = User.objects.filter(username=username).first()

  if request.user not in user.subscribers.all():
    user.followers = user.followers + 1
    user.subscribers.add(request.user.pk)
    user.save()
    return JsonResponse({"status": "ok"}, safe=False)

  return JsonResponse({"status": "bad"}, safe=False)


def unsubscribe(request):
  username = request.POST.get("username")
  user = User.objects.filter(username=username).first()

  if request.user in user.subscribers.all():
    user.followers = user.followers - 1
    user.subscribers.remove(request.user.pk)
    user.save()
    return JsonResponse({"status": "ok"}, safe=False)

  return JsonResponse({"status": "bad"}, safe=False)

def edit_user(request):
  username = request.POST.get("username")
  name = request.POST.get("name")
  email = request.POST.get("email")
  website = request.POST.get("website")
  about = request.POST.get("about")

  user = User.objects.filter(username="adminadminadmina").first() # request.user

  if username is not None:
    user.username = username

  if name is not None:
    user.name = name

  if email is not None:
    user.email = email

  if website is not None:
    user.website = website

  if about is not None:
    user.about = about

  user.save()

  return JsonResponse({"status": "ok"}, safe=False)

def change_avatar(request):
  avatar = request.FILES["avatar"]
  user = User.objects.filter(username="adminadminadmina").first()

  if avatar.content_type.startswith("image/"):
    os.remove(user.avatar.path)
    user.avatar=avatar
    user.save()
    return JsonResponse({"avatar": user.avatar.url}, safe=False)

  return JsonResponse({"status": "bad"}, safe=False)