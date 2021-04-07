from django.contrib.auth.forms import AuthenticationForm

from django import forms


class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)

    username = forms.EmailField(widget=forms.TextInput(
        attrs={'name':'username','required':'','type':'email', 'class': 'formgroup', 'placeholder': 'Email', 'id': 'id_username'}))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'type':'password',
            'name':'password',
            'required':'',
            'class': 'formgroup',
            'placeholder': 'Password',
            'id': 'id_password',
        }
))