from django.http import JsonResponse

def postSaveDecorator(func):
  def wrapper(request, id):
    if request.user.pk is None:
      return JsonResponse({"status": "Unauthorize"}, safe=False)
  
    user = request.user

    func(user, id)
    
    return JsonResponse({"status": "ok"}, safe=False)
    
  return wrapper