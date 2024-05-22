from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class Account(AbstractUser):
    """Extended Account Model"""
    nickname = models.CharField(default='unkown',null=False,max_length=20)
    email_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name_plural = "Account"