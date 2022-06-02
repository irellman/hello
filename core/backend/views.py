from django.shortcuts import render

def handler404(request, exceptoin):
  return render(request, "index.html")