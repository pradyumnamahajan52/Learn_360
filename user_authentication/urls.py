from django.contrib import admin
from django.urls import path,include
from django.contrib.auth import views
from .loginforms import UserLoginForm
from .views import dashboard,signup

urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls')),
    path('dashboard/', dashboard,name='dashboard'),
    path('signup/', signup, name="register"),
    path('socialaccounts/', include('allauth.urls')),
    path('login/',views.LoginView.as_view(template_name="registration/login.html",authentication_form=UserLoginForm),name='login')
    # path('user/',include('api.user.urls')),
]


