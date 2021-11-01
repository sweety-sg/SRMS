from django.http.response import JsonResponse
from django.shortcuts import render, redirect
from rest_framework.response import Response
from django.urls import reverse
from django.http import *
from django.template import context, loader
from django.contrib.auth.models import User
from rest_framework import serializers, viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.views import APIView
from .serializers import *
# from .permissions import *
from rest_framework.renderers import JSONRenderer
from .models import *
from . import models
from django.contrib.auth import authenticate, login,logout,get_user_model
from rest_framework.decorators import api_view, permission_classes
from .permissions import *

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

class UserViewSet(viewsets.ModelViewSet):
    """
     Allows users to be viewed or updated.
    """
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None


    @action(methods=['GET'], detail = False, url_path='results',url_name='user-results')
    def user_results(self,request):
        if(request.user.is_authenticated):
            serializer = ExamResultSerializer(request.user.resultsOfstudent.all(), many = True)
            return Response(serializer.data)
        else:
            return HttpResponseForbidden()
    
     
    
    @action(methods=['GET'], detail = False, url_path='data',url_name='user-data')
    def user_data(self,request):
        if(request.user.is_authenticated):
            user_data = UserSerializer(request.user)
            return Response(user_data.data)
        else:
            return HttpResponseForbidden()
    

    @action(methods=['GET'], detail = False, url_path='logout',url_name='logout')
    def user_logout(self,request):
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({'status': 'Logged out'})
        else:
            return HttpResponseForbidden()

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'POST' or self.request.method == 'DELETE':
            self.permission_classes = [permissions.IsAuthenticated, isAdmin]

        return super(UserViewSet, self).get_permissions()


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE' or self.request.method == 'POST':
            self.permission_classes = [permissions.IsAuthenticated,isAdmin]

        return super(SubjectViewSet, self).get_permissions()

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE' or self.request.method == 'POST':
            self.permission_classes = [permissions.IsAuthenticated,isAdmin|isTeacher]

        return super(ExamViewSet, self).get_permissions()


class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated,isSelforAdmin]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE' or self.request.method == 'POST':
            self.permission_classes = [permissions.IsAuthenticated,isAdmin|isTeacher]

        return super(ResultViewSet, self).get_permissions()


class ResultsofExam(APIView):
    permission_classes= [isTeacher|isAdmin]
    def get(self, request, pk ,format=None):
        exam = Exam.objects.get(id=pk)
        # serializer = ResultExamSerializer(exam.resultsOfexam.all(), many = True)
        serializer = ResultExamSerializer(exam, many= True)
        return Response(serializer.data)

class subjectPage(APIView):
    permission_classes= [isTeacher|isAdmin|isSelf]
    def get(self, request,sk,format=None):
        results = request.user.resultsOfstudent.all().filter(subject=sk)
        serializer = ExamResultSerializer(results, many= True)
        return Response(serializer.data)
        
class subjectBycode(APIView):
    permission_classes=[permissions.IsAuthenticated]
    def get(self, request,val,format=None):
        subject = Subject.objects.get(code=val)
        serializer = SubjectSerializer(subject)
        return Response(serializer.data)
    # def post(self,request,obj):

    #     serializer = ResultExamSerializer(data=request.data)
    #     if serializer.is_valid():
    #         obj = serializer.save()
    #         data = serializer.data
    #         data["id"] = obj.id
    #         return Response(data, status=status.HTTP_201_CREATED)
    #     return Response(status=status.HTTP_400_BAD_REQUEST)

def logout_view(request):
    if request.user.is_authenticated:
            logout(request)
            return JsonResponse({'status': 'successful'})
    else:
        return HttpResponseForbidden()
