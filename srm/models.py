from django.db import models
from django.utils import timezone
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    id = models.AutoField(primary_key = True)
    # username = models.IntegerField(blank= True ,null=True)
    # user_id = models.IntegerField(blank= False)
    image = models.CharField(max_length=655, blank=True, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    # email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)  # Field name made lowercase.
    # password = models.CharField(db_column='Password', max_length=255, blank=True, null=True)  # Field name made lowercase.
    is_admin = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)



