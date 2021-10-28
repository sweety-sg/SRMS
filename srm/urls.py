from django.urls import path
from django.contrib import admin
from django.views.generic import TemplateView
from . import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

app_name = 'srm'

router.register(r'user',views.UserViewSet, basename='user')
router.register(r'subject',views.SubjectViewSet, basename='subject')
router.register(r'exam',views.ExamViewSet, basename='exam')
router.register(r'result',views.ResultViewSet, basename='result')

urlpatterns = [
    path('', views.index, name='index'),
    path('exam/<int:pk>/results', views.ResultsofExam.as_view()),
    path('logout', views.logout_view, name="logout"),
]

urlpatterns += router.urls