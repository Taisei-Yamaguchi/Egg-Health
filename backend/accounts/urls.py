from django.urls import path
from .views import (
    SignUpAPIView,
    VerifyEmailAPIView,
    SignInAPIView, 
    LogoutAPIView,
    UpdateAccountAPIView,
    GetAccountAPIView,
    GoogleSignInAPIView,
    DeleteAccountAPIView
)

urlpatterns = [
    path('signup/', SignUpAPIView.as_view(), name='signup'),
    path('verify/',VerifyEmailAPIView.as_view(),name='verify'),
    path('signin/', SignInAPIView.as_view(), name='signin'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('update/',UpdateAccountAPIView.as_view(),name="update"),
    path('get/',GetAccountAPIView.as_view(),name="get"),
    path('google-sign-in/', GoogleSignInAPIView.as_view(), name='google-sign-in'),
    path('delete/<int:id>/',DeleteAccountAPIView.as_view(),name="delete"),
]
