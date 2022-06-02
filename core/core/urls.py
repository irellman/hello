from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

from backend.Controllers import IndexController

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('backend.urls')),
    re_path(r'^.', IndexController.index),
    path('', IndexController.index),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
