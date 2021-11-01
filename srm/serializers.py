from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
User = get_user_model()



class ResultSerializer(serializers.ModelSerializer):
    '''Result serializer'''
    class Meta:
        model = Result
        fields = '__all__'



class ExamSerializer(serializers.ModelSerializer):
    '''Exam serializer'''
    class Meta:
        model = Exam
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    '''Subject serializer'''
    examOfsub= ExamSerializer(many=True, read_only = True)
   
    class Meta:
        model = Subject
        fields = ['id','name','code', 'wiki','examOfsub']

class UserSerializer(serializers.ModelSerializer):
    '''User serializer'''
    subjects = SubjectSerializer(many=True, read_only = True)
    class Meta:
        model = User
        fields = ['id','username','department', 'full_name','image', 'email', 'is_admin', 'is_teacher','subjects']

class ResultExamSerializer(serializers.ModelSerializer):
    resultsOfexam = ResultSerializer(many=True, read_only = True)
    subject = SubjectSerializer()
    # class Meta:
    #     model = Result
    #     fields = ['id','marks','student']
    class Meta:
        model = Exam
        fields = ['id','name','date','wiki','resultsOfexam','subject']

class ExamResultSerializer(serializers.ModelSerializer):
    exam = ExamSerializer()
    student = UserSerializer()
    subject = SubjectSerializer()
    class Meta:
        model = Result
        # field = ['id','marks','exam','student','subject']
        fields = '__all__'