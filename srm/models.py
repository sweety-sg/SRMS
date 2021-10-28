from django.db import models
from django.utils import timezone
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    id = models.AutoField(primary_key = True)
    # username = models.IntegerField(blank= True ,null=True)
    department = models.CharField(max_length=255,blank= True ,null=True)
    image = models.CharField(max_length=655, blank=True, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)  # Field name made lowercase.
    # password = models.CharField(db_column='Password', max_length=255, blank=True, null=True)  # Field name made lowercase.
    is_admin = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    class Meta:
        db_table = 'User'

class Subject(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    code = models.CharField(max_length=255,blank= True ,null=True)
    wiki = models.TextField(blank=True, null=True)

class Exam(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField()
    wiki = models.TextField(blank=True, null=True)
    subject= models.ForeignKey(to=Subject, on_delete=models.CASCADE, null=True, related_name='examOfsub')

class Result(models.Model):
    id = models.AutoField(primary_key=True)
    marks = models.IntegerField(blank= True ,null=True)
    student = models.ForeignKey(to=User, on_delete=models.CASCADE, null=True, related_name='resultsOfstudent')
    exam = models.ForeignKey(to=Exam, on_delete=models.CASCADE, null=True, related_name='resultsOfexam')
    subject= models.ForeignKey(to=Subject, on_delete=models.CASCADE, null=True, related_name='resultsOfsub')
    


    




