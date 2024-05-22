from django.contrib.auth.models import AbstractUser

class Account(AbstractUser):
    """Extended Account Model"""
    
    class Meta:
        verbose_name_plural = "Account"