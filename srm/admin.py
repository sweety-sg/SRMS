from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

admin.site.register(User)
admin.site.register(Exam)
admin.site.register(Result)
admin.site.register(Subject)

# Register your models here.
