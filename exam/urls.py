from django.urls import path,include
from .views import test_select,test,test_history,exam_subjectViewSet,exam_questionViewSet,test_end
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'subjects', exam_subjectViewSet)
# router.register(r'question', exam_questionViewSet)

# router.register(r'questions/', exam_questionViewSet)
# router.register(r'', exam_questionViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('quiz/select/', test_select,name='test_select'),
    
    path('quiz/history/',test_history,name='test_history'),
    path('quiz/start/',test,name='test'),
    path('quiz/end/',test_end,name='test_end'),
    # path('user/',include('api.user.urls')),
]


