from django.http import JsonResponse
from ..Models.Comment import Comment
from ..Models.User import User
from ..Models.Post import Post

from ..helpers.getPublishDate import getPublishedDate
from ..decorators.commentLikeDecorator import likeDecorator

def getPostComments(request):
  post_id = request.POST.get("post_id")
  page = int(request.POST.get("page"))

  comments = Comment.objects.filter(post__id=post_id).filter(answer_to=None).order_by("-published_at")
  hasNextPage = False

  if comments.count() - (page*20) >= 20:
    hasNextPage = True

  result = {
    "comments": [],
    "hasNextPage": hasNextPage
  }

  for comment in comments.all()[20*page:20*(page+1)]:
    isLiked = False

    if comment.likers.filter(id=request.user.pk).count() != 0:
      isLiked = True

    result["comments"].append({
      "id": comment.pk,
      "text": comment.text,
      "published_at": getPublishedDate(comment.published_at),
      "likes": comment.likes,
      "comments_count": Comment.objects.filter(answer_to__pk=comment.pk).count(),
      "answers": [],
      "isLiked": isLiked,
      "user": {
        "username": comment.user.username,
        "avatar": comment.user.avatar.url
      }
    })

  return JsonResponse(result, safe=False)

def getUserAnswers(request):
  comment_id = request.POST.get("comment_id")
  page = int(request.POST.get("page"))
  hasNextPage = False

  comments = Comment.objects.filter(answer_to__pk=comment_id).order_by("-published_at")

  if comments.count() - (page*20) >= 20:
    hasNextPage = True

  result = {
    "comments": [],
    "hasNextPage": hasNextPage
  }

  for answer in comments.all()[20*page:20*(page+1)]:
    isLiked = False

    if answer.likers.filter(id=request.user.pk).count() != 0:
      isLiked = True

    result["comments"].append({
      "id": answer.pk,
      "text": answer.text,
      "published_at": getPublishedDate(answer.published_at),
      "likes": answer.likes,
      "answer_to": answer.answer_to.pk,
      "isLiked": isLiked,
      "user": {
        "username": answer.user.username,
        "avatar": answer.user.avatar.url
      }
    })

  return JsonResponse(result, safe=False)

def addComment(request):
  if request.user.pk is None:
    return JsonResponse({"status": "Unauthorize"}, safe=False)

  post = Post.objects.filter(pk=request.POST.get("post_id")).first()
  answer_to = None

  if request.POST.get("answer_to") != 0:
    answer_to = Comment.objects.filter(pk=request.POST.get("answer_to")).first()

  comment = Comment.objects.create(
    post=post,
    user=request.user,
    answer_to=answer_to,
    text=request.POST.get("comment")
  )
  
  post.comment_count = post.comment_count + 1

  post.save()
  comment.save()

  return JsonResponse({"status": "ok"}, safe=False)

@likeDecorator
def likeComment(user_id, comment):
  if comment.likers.filter(pk=user_id).first() is None:
    comment.likes = comment.likes + 1
    comment.likers.add(user_id)

@likeDecorator
def dislikeComment(user_id, comment):
  if comment.likers.filter(pk=user_id).first() is not None:
    comment.likes = comment.likes - 1
    comment.likers.remove(user_id)