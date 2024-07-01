from django.urls import path
from .views import (
    GetLicenseTypeAPIView,
    GetLicenseDetailsAPIView,
    CreateCheckoutSessionView,
    CancelSubscriptionAPIView
)

from .webhook import stripe_webhook

urlpatterns = [
    path('get-license-type/', GetLicenseTypeAPIView.as_view(), name='get-license-type'),
    path('get-license-detail/', GetLicenseDetailsAPIView.as_view(), name='get-license-detail'),
    
    
    path('create-checkout-session/',CreateCheckoutSessionView.as_view(), name='create-checkout-session'),
    path('cancel-subscription/',CancelSubscriptionAPIView.as_view(), name='cancel-subscription'),
    
    path('webhook/stripe/', stripe_webhook, name='stripe-webhook'),
]
