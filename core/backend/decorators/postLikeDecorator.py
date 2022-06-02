from django.http import JsonResponse

from backend.Models.Post import Post

def postLikeDecorator(func):
  def wrapper(request, id):
    if request.user.pk is None:
      return JsonResponse({"status": "Unauthorize"}, safe=False)
    
    post = Post.objects.get(pk=id)
    user = request.user

    func(post, user)
    
    post.publisher.save()
    post.save()
    
    return JsonResponse({"status": "ok"}, safe=False)
    
    
  return wrapper