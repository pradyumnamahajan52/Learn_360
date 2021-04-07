from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('user/', include('user_authentication.urls')),
    path('exam/', include('exam.urls')),
    path('', include('home.urls')),
    path('admin/', admin.site.urls),
    # path('user/',include('api.user.urls')),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)