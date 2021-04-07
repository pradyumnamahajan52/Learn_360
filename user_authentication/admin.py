from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Learn360User

class Learn360UserAdmin(admin.ModelAdmin):

    list_display = ('id','first_name','email','last_login','created_at')
    list_display_links = ('id','first_name','email')
    search_fields = ('first_name','email')
  

admin.site.unregister(Group)
admin.site.register(Learn360User,Learn360UserAdmin)
