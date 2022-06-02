from django.http import JsonResponse
from ..Models.Comment import Comment

def likeDecorator(func):
  def wrapper(request):
    if request.user.pk is None:
      return JsonResponse({"status": "Unauthorize"}, safe=False)
    
    comment_id = int(request.POST.get("comment_id"))
    user_id = request.user.pk
    comment = Comment.objects.filter(pk=comment_id).first()

    func(user_id, comment)
    
    comment.save()

    return JsonResponse({"status": "ok"}, safe=False)
    
  return wrapper