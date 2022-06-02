from django.http import JsonResponse
from ..Models.Saved import Saved
from ..Models.Collection import Collection
from ..Models.User import User

from ..helpers.getPublishDate import getPublishedDate

def getCollections(request):
    username = "adminadminadmina"  # request.user.username
    result = []
    user_posts = Saved.objects.filter(user__username=username)

    saved = user_posts.order_by('-added_at').first()

    if saved is not None:
        result.append({
            "id": 0,
            "name": "Все публикации",
            "image": saved.post.images.first().image.url
        })

        collections = Collection.objects.filter(user__username=username).all()

        for collection in collections:
            post = user_posts.filter(collection__name=collection.name).order_by('-added_at').first()

            if post is not None:
                result.append({
                    "id": collection.pk,
                    "name": collection.name,
                    "image": post.post.images.first().image.url
                })
            else:
                result.append({
                    "id": collection.pk,
                    "name": collection.name,
                    "image": ""
                })

        return JsonResponse(result, safe=False)

    return JsonResponse([], safe=False)


def getCollection(request):
    username = "adminadminadmina"  # request.user.username
    collection_id = int(request.POST.get("collection_id"))
    page = int(request.POST.get("page"))
    result = {
        "collection_name": "",
        "hasNextPage": False,
        "posts": []
    }

    if collection_id == 0:
        saved_posts = Saved.objects.filter(user=User.objects.filter(username=username).first().pk).all()
        result["collection_name"] = "Все публикации"
    else:
        saved_posts = Saved.objects.filter(user__username=username).filter(
            collection=collection_id
        ).order_by("-added_at")
        result["collection_name"] = Collection.objects.filter(pk=request.POST.get("collection_id")).first().name

    if saved_posts.count() - (page * 12) > 12:
        result["hasNextPage"] = True

    for saved_post in saved_posts.all()[page * 12:page * 12 + 12]:
        post = saved_post.post

        json = {
            "id": post.id,
            "images": [],
            "description": post.description,
            "tags": post.tags,
            "likes": post.like_count,
            "commentsCount": post.comment_count,
            "isLiked": False,
            "isSaved": True,
            "published_at": getPublishedDate(post.published_at),
            "likers": [],
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


def createCollection(request):
    collection_name = request.POST.get("collection_name")
    user = User.objects.filter(username="adminadminadmina").first()  # request.user

    collection = Collection.objects.create(
        user=user,
        name=collection_name
    )

    result = {
        "id": collection.pk,
        "name": collection.name
    }

    return JsonResponse(result, safe=False)


def deleteCollection(request):
    collection_id = request.POST.get("collection_id")
    user = User.objects.filter(username="adminadminadmina").first()  # request.user
    user_collections = Collection.objects.filter(user__username=user.username)

    user_collections.filter(pk=collection_id).delete()

    return JsonResponse({"status": "ok"}, safe=False)

def renameCollection(request):
    collection_id = request.POST.get("collection_id")
    collection_name = request.POST.get("collection_name")
    user = User.objects.filter(username="adminadminadmina").first()  # request.user
    user_collections = Collection.objects.filter(user__username=user.username)

    user_collections.filter(pk=collection_id).update(name=collection_name)

    return JsonResponse({"status": "ok"}, safe=False)

def editCollection(request):
    collection_id = request.POST.get("collection_id")
    posts_id = request.POST.get("posts_id").split(",")

    if posts_id[0] == "":
        posts_id = []

    user = User.objects.filter(username="adminadminadmina").first()  # request.user
    user_collections = Collection.objects.filter(user__username=user.username)
    user_collections.filter(pk=collection_id)

    current_collection = Collection.objects.filter(pk=collection_id).first()
    all_user_posts = Saved.objects.filter(user__username=user.username)

    if len(posts_id) > 0:
        for post in all_user_posts.filter(post__pk__in=posts_id).all():
            post.collection.add(current_collection)

        for post in all_user_posts.exclude(post__pk__in=posts_id).all():
            post.collection.remove(current_collection)
    else:
        for post in all_user_posts.filter(collection__pk=collection_id).all():
            post.collection.remove(current_collection)

    return JsonResponse({"status": "ok"}, safe=False)