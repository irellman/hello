from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Q
from ..Models.User import User

def index(request):
  return render(request, "index.html")

def handler404(request, exceptoin):
  return render(request, "index.html")

def searchUsersOrTags(request):
  query = request.POST.get("query")
  result = []
  
  for item in User.objects.filter(Q(username__contains=query) | Q(name__contains=query)).all():
    result.append({
      "image": item.avatar.url,
      "title": item.username,
      "subtitle": item.name
    })
  
  return JsonResponse(result, safe=False)