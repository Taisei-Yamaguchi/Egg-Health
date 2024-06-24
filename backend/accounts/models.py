from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class Account(AbstractUser):
    """Extended Account Model"""
    nickname = models.CharField(default='unkown',null=False,max_length=100)
    email_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    is_google = models.BooleanField(default=False)  # new add
    
    class Meta:
        verbose_name_plural = "Account"
    def __str__(self):
        return f"Account {self.id} ({self.username})"