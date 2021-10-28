'''Permissions for various views in the app'''
from requests.sessions import session
from .models import User
from rest_framework import permissions

class isSelf(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.student == request.user
        

class isTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_teacher

class isAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_admin

class isSelforAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if(obj.student == request.user or request.user.is_admin):
            return True
        return False