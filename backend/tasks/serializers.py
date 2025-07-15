from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Task
from accounts.serializers import UserSerializer

User = get_user_model()


class TaskSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'due_date', 'created_at', 'updated_at', 'user')
        read_only_fields = ['id', 'created_at', 'updated_at', 'user']
            