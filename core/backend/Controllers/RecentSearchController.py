from django.http import JsonResponse

from ..Models.RecentSearch import RecentSearch
from ..Models.User import User

from datetime import datetime

def getRecentSearch(request):
  if request.user.pk is None:
    return JsonResponse({"status": "Unauthorize"})
  
  userRecentSearches = RecentSearch.objects.filter(owner=request.user.pk)
  recentSearches = userRecentSearches.order_by("-search_at").all()
  result = []

  for recentSearch in recentSearches:
    if recentSearch.user is not None:
      result.append({
        "image": recentSearch.user.avatar.url,
        "title": recentSearch.user.username,
        "subtitle": recentSearch.user.name
      })
    else:
      pass

  return JsonResponse(result, safe=False)

def clearRecentSearch(request):
  if request.user.pk is None:
    return JsonResponse({"status": "Unauthorize"})
  
  user = request.user
  RecentSearch.objects.filter(owner=user.pk).all().delete()

  return JsonResponse({"status": "ok"}, safe=False)

def deleteRecentSearch(request):
  if request.user.pk is None:
    return JsonResponse({"status": "Unauthorize"})
  
  query = request.POST.get("query")
  userRecentSearches = RecentSearch.objects.filter(owner=request.user.pk)
  
  if query.startswith("#"):
    pass
  else:
    userRecentSearches.filter(user__username=query).delete()
  
  return JsonResponse({"status": "ok"}, safe=False)

def addRecentSearch(request):
  if request.user.pk is None:
    return JsonResponse({"status": "Unauthorize"})
  
  query = request.POST.get("query")
  userRecentSearches = RecentSearch.objects.filter(owner=request.user.pk)
  toReturn = {}
  
  if query.startswith("#"):
    pass
  else:
    if userRecentSearches.filter(user__username=query).count() == 0:
      user = User.objects.filter(username=query).first()
      recentSearch = RecentSearch.objects.create(
        user = user,
        owner = request.user
      )
      
      recentSearch.save()
      
      toReturn = {
        "image": user.avatar.url,
        "title": user.username,
        "subtitle": user.name
      }
    else:
      return JsonResponse({"status": "already exist"})

  return JsonResponse(toReturn, safe=False)

def updateRecentSearch(request):
  if request.user.pk is None:
    return JsonResponse({"status": "Unauthorize"})
  
  query = request.POST.get("query")
  userRecentSearches = RecentSearch.objects.filter(owner=request.user.pk)
  
  if query.startswith("#"):
    pass
  else:
    userRecentSearches.filter(user__username=query).update(search_at=datetime.now())

  return JsonResponse({"status": "ok"}, safe=False)