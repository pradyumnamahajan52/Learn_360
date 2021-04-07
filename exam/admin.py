from django.contrib import admin
from .models import ExamSubject,ExamQuestions,UserAnswersheet,UserSubjectsheet
# Register your models here.

class exam_subjectAdmin(admin.ModelAdmin):

    list_display = ('id','subject','total_mark','exam_time','exam_start_time')
    list_display_links = ('id','subject')
    search_fields = ('subject',)

admin.site.register(ExamSubject,exam_subjectAdmin)

class exam_questionsAdmin(admin.ModelAdmin):

    list_display = ('id','exam_subject_id','question','ANS')
    list_display_links = ('id','exam_subject_id','question')
    search_fields = ('exam_subject_id',)

class UserAnswersheetAdmin(admin.ModelAdmin):

    list_display = ('id','user','exam_subject_id','exam_question_id')
    list_display_links = ('id','user','exam_subject_id','exam_question_id')
    search_fields = ('user','exam_subject_id','exam_question_id')

class UserSubjectsheetAdmin(admin.ModelAdmin):

    list_display = ('id','user','exam_subject_id','total_mark')
    list_display_links = ('id','user','exam_subject_id')
    search_fields = ('user','exam_subject_id')

admin.site.register(ExamQuestions,exam_questionsAdmin)
admin.site.register(UserAnswersheet,UserAnswersheetAdmin)
admin.site.register(UserSubjectsheet,UserSubjectsheetAdmin)

