from django.db import models
from accounts.models import Account
from django.utils.timezone import now, timedelta

class License(models.Model):
    LICENSE_TYPE_CHOICES = (
        ('free', 'Free'),
        ('premium', 'Premium'),
        ('premium_plus', 'Premium+'),
    )
    
    BILLING_PERIOD_CHOICES = (
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    )

    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    license_type = models.CharField(max_length=20, choices=LICENSE_TYPE_CHOICES, default='free')
    billing_period = models.CharField(max_length=10, choices=BILLING_PERIOD_CHOICES, default='monthly')
    start_date = models.DateField(default=now)
    end_date = models.DateField(null=True, blank=True)
    last_modified = models.DateTimeField(auto_now=True)
    is_subscription_active = models.BooleanField(default=True)
    stripe_customer_id = models.CharField(max_length=255, null=True, blank=True)
    stripe_subscription_id = models.CharField(max_length=255, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.end_date:
            if self.billing_period == 'monthly':
                self.end_date = self.start_date + timedelta(days=30)
            elif self.billing_period == 'yearly':
                self.end_date = self.start_date + timedelta(days=365)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.id}{self.account.username} - {self.license_type} ({self.billing_period})"