from django.shortcuts import render,HttpResponse,redirect
from django.http import JsonResponse
from .models import Learn360User
from django import forms
from django.contrib import messages
from django.db import IntegrityError
from .forms import UserCreationForm

# Create your views here.


def dashboard(request):
    return JsonResponse({'User Email':str(request.user)})

def signup(request):
    if request.method == "GET":
        return render(
            request, "registration/registration.html",
            {"form": UserCreationForm}
        )
    elif request.method == "POST":
        try:
            form = UserCreationForm(request.POST)
            if form.is_valid():
                form.save()
                messages.success(request,'your account is successfully Updated')
                return redirect('/user/login/')
            else:
                messages.error(request,form.errors)
                return redirect('/user/signup/')

        except IntegrityError as e:
            messages.error(request,"Email is already used, please use new Email")
            return redirect('/user/signup/')
        except Exception as e:
            messages.error(request,e)
            return redirect('/user/signup/')