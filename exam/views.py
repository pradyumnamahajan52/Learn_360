from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from django.http import JsonResponse
from .serializers import ExamSubjectSerializer,ExamQuestionSerializer
from .models import ExamQuestions,ExamSubject,UserSubjectsheet,UserAnswersheet
from django.views.decorators.csrf import csrf_exempt
import json
from user_authentication.models import Learn360User
import datetime

# Create your views here.



class exam_subjectViewSet(viewsets.ModelViewSet):
    queryset = ExamSubject.objects.all()
    serializer_class = ExamSubjectSerializer


class exam_questionViewSet(viewsets.ModelViewSet):
    queryset = ExamQuestions.objects.all()
    serializer_class = ExamQuestionSerializer

# Create your views here.

def test_select(request):
    examSubject =  ExamSubject.objects.all()
    params = {
        'examSubject':examSubject,
    }
    return render(request,'home/test.html',params)


@login_required(login_url='/user/accounts/login/')
def test(request):
    return render(request,'home/testpage.html')


@login_required(login_url='/user/accounts/login/')
def test_history(request):
    USS = UserSubjectsheet.objects.filter(user=request.user.id).all().order_by('-submitted_on') 
    params = {
        'USS':USS,
    }
    return render(request,'home/testhistory.html',params)


@login_required(login_url='/user/accounts/login/')
def test_end(request):
    try:
        data = json.loads(request.body)
        examSubject = data['exam_subject']
        examPaperSheet = dict(data['examPaperSheet'])
        exq = ExamQuestions.objects.filter(exam_subject_id=int(examSubject)).all()
        StudentMark = 0
        ES = ExamSubject(int(examSubject))
        LU = Learn360User(request.user.id)
        for i in exq:
            EQ = ExamQuestions(i.id)
            if examPaperSheet.get(str(i.id)) != "":
                if examPaperSheet.get(str(i.id)) == i.ANS:
                    UAS = UserAnswersheet(attempted=True,
                    user=LU,
                    exam_subject_id=ES,
                    exam_question_id=EQ,
                    user_ANS=i.ANS,
                    mark=i.mark)
                    StudentMark+=i.mark
                    UAS.save()
                else:
                    UAS = UserAnswersheet(attempted=True,
                    user=LU,
                    exam_subject_id=ES,
                    exam_question_id=EQ,
                    user_ANS=i.ANS,
                    mark=i.negative_mark)
                    StudentMark+=i.negative_mark
                    UAS.save()
            else:
                UAS = UserAnswersheet(attempted=False,
                user=LU,
                exam_subject_id=ES,
                exam_question_id=EQ,
                user_ANS=None,
                mark=0)
                UAS.save()

        USS = UserSubjectsheet(attempted=1,user=LU,exam_subject_id=ES,total_mark=StudentMark,submitted_on=datetime.datetime.now())
        USS.save()
    except Exception as e:
        return JsonResponse(e, safe=False)
    
    return JsonResponse(StudentMark, safe=False)