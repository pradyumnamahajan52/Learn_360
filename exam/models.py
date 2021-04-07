from django.db import models
from datetime import datetime
from ckeditor.fields import RichTextField
from user_authentication.models import Learn360User


# Create your models here.


class ExamSubject(models.Model):
    subject = models.CharField(max_length=250,default=None)
    total_mark = models.PositiveSmallIntegerField(default=0)
    exam_time = models.DurationField(default=0)
    exam_start_time = models.DateTimeField(default=datetime.now, blank=True,null=True)
    exam_created_by = models.ForeignKey(Learn360User, default=None, on_delete=models.CASCADE)
    subject_image = models.ImageField(upload_to='media/exam_subject/')
    no_of_attempt = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return str(self.id)+" - "+self.subject

class ExamQuestions(models.Model):
    exam_subject_id = models.ForeignKey(ExamSubject,related_name='examQuestions',default=None, on_delete=models.CASCADE)
    question = RichTextField()
    A = models.TextField()
    B = models.TextField()
    C = models.TextField()
    D = models.TextField()
    ANS = models.TextField()
    mark = models.PositiveSmallIntegerField(default=1)
    negative_mark = models.SmallIntegerField(default=0)
    flag = models.SmallIntegerField(default=2,blank=True,null=True)
    clickedSave = models.SmallIntegerField(default=0,blank=True,null=True)
    userSelectedAnswer =  RichTextField(default=None,blank=True,null=True)
    created_at = models.DateTimeField(default=datetime.now, blank=True,null=True)

    def __str__(self):
        return str(self.id)+" - "+str(self.exam_subject_id)+" - "+ self.question


class UserAnswersheet(models.Model):
    attempted = models.BooleanField(default=True)
    user = models.ForeignKey(Learn360User,default=None, on_delete=models.CASCADE) 
    exam_subject_id = models.ForeignKey(ExamSubject,default=None, on_delete=models.CASCADE)
    exam_question_id =  models.ForeignKey(ExamQuestions,default=None , on_delete=models.CASCADE)
    user_ANS = models.TextField(blank=True,null=True,default=None)
    mark = models.SmallIntegerField(default=0)

    def __str__(self):
        return str(self.id)+" - "+str(self.exam_subject_id)



class UserSubjectsheet(models.Model):
    attempted = models.SmallIntegerField(default=0)
    user = models.ForeignKey(Learn360User,default=None, on_delete=models.CASCADE) 
    exam_subject_id = models.ForeignKey(ExamSubject,default=None, on_delete=models.CASCADE)
    total_mark = models.SmallIntegerField(default=0)
    submitted_on = models.DateTimeField(default=datetime.now, blank=True,null=True)

    def __str__(self):
        return str(self.id)+" - "+str(self.exam_subject_id)
    



