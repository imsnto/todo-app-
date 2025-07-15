from django.shortcuts import render

from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView


from .serializers import TaskSerializer
from .models import Task


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
        return self.request.user.tasks
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    

