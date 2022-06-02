from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_user
from django.contrib.auth import logout as logout_user
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from ..tokens import account_activation_token
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str

from ..Models.User import User

def auth(request):
  if request.user.is_authenticated:
    user = {
      "id": request.user.id,
      "username": request.user.username,
      "avatar": request.user.avatar.url
    }

    return JsonResponse(user, safe=False)
  else:
    return JsonResponse({"status": "fail"}, safe=False)

def login(request):
  email = request.POST['email']
  password = request.POST['password']

  user = authenticate(email=email, password=password)

  if user is not None:
    if user.is_active:
      login_user(request, user)

    user = {
      "id": request.user.id,
      "username": request.user.username,
      "avatar": request.user.avatar.url
    }

    return JsonResponse(user, safe=False)
  else:
    return JsonResponse({"message": "Неверное имя пользователя или пароль!"}, safe=False)

def signup(request):
  email = request.POST['email']
  username = request.POST['username']
  password = request.POST['password']
  passwordConfirmation = request.POST['passwordConfirmation']

  username_is_used = User.objects.filter(username=username).count()
  emailIsUsed = User.objects.filter(email=email).count()

  if password == passwordConfirmation and username_is_used == 0 and emailIsUsed == 0:
    user = User.objects.create_user(username=username.lower(), password=password, email=email)
    user.is_active = False
    user.save()
    current_site = get_current_site(request)
    mail_subject = 'Activate your account.'
    message = render_to_string('email_template.html', {
      'user': user,
      'domain': current_site.domain,
      'uid': urlsafe_base64_encode(force_bytes(user.pk)),
      'token': account_activation_token.make_token(user),
    })
    send_mail(mail_subject, message, 'youremail', [email])
    return JsonResponse({"success": True})
  else:
    return JsonResponse({"success": False})

def activate(request, uidb64, token):
  if request.method == "POST":  
    try:
      uid = force_str(urlsafe_base64_decode(uidb64))
      user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
      user = None
    if user is not None and account_activation_token.check_token(user, token):
      user.is_active = True
      user.save()
      return JsonResponse({"success": True})
    else:
      return JsonResponse({"success": False})

def logout(request):
  logout_user(request)

  if request.user.is_authenticated == False:
    return JsonResponse({"success": True}, safe=False)
  else:
    return JsonResponse({"success": False}, safe=False)