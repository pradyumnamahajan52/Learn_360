from rest_framework import serializers
from rest_framework.reverse import reverse
from .models import ExamSubject,ExamQuestions
from user_authentication.models import Learn360User


class ExamUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Learn360User
        fields = ('id','email','first_name','last_name')



class ExamQuestionSerializer(serializers.HyperlinkedModelSerializer):
    # exam_created_by = exam_userbySerializer(read_only=True)
    class Meta:
        model = ExamQuestions
        fields = ('id',
        'question',
        'A',
        'B',
        'C',
        'D',
        'mark',
        'negative_mark',
        'flag',
        'clickedSave',
        'userSelectedAnswer',
        'created_at',
        'exam_subject_id',
        )

    
class ExamSubjectSerializer(serializers.HyperlinkedModelSerializer):
    examQuestions = ExamQuestionSerializer(many=True,read_only=True)
    subject_image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
    exam_created_by = ExamUserSerializer(read_only = True)
    class Meta:
        model = ExamSubject
        fields = ('id',
        'url',
        'subject_image',
        'exam_created_by',
        'subject',
        'total_mark',
        'exam_time',
        'exam_start_time',
        'no_of_attempt',
        'examQuestions',
        )