from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from accounts.models import Account
from .models import License
import stripe
import os
from dotenv import load_dotenv
load_dotenv()

# Get License Type
class GetLicenseTypeAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            account = request.user
            license = get_object_or_404(License, account=account)
            license_type = license.license_type
            
            return Response({
                'message': 'Get License Type successfully!',
                'license_type': license_type
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'An error occurred while fetching license type.',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get License Details
class GetLicenseDetailsAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            account = request.user
            license = get_object_or_404(License, account=account)
            
            data = {
                'license_type': license.license_type,
                'billing_period': license.billing_period,
                'start_date': license.start_date,
                'end_date': license.end_date,
                'is_subscription_active': license.is_subscription_active
            }
            return Response({
                'message': 'Get License Type successfully!',
                'data': data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'An error occurred while fetching license type.',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Stripe Actions
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

PRICE_IDS = {
    'premium_monthly': os.getenv("STRIPE_PRICE_ID_PREMIUM_MONTH"),
    'premium_yearly': os.getenv("STRIPE_PRICE_ID_PREMIUM_YEAR"),
    'premium_plus_monthly': os.getenv("STRIPE_PRICE_ID_PREMIUMPLUS_MONTH"),
    'premium_plus_yearly': os.getenv("STRIPE_PRICE_ID_PREMIUMPLUS_YEAR"),
}

# Create Checkout Session
class CreateCheckoutSessionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        account = request.user
        item_license = request.data.get('item_license')
        item_period = request.data.get('item_period')

        if not item_license or not item_period:
            return Response({'error': 'Both itemLicense and licensePeriod are required'}, status=status.HTTP_400_BAD_REQUEST)

        license = get_object_or_404(License, account=account)
        current_license_type = license.license_type

        if license:
            if current_license_type == 'premium_plus':
                return Response({'error': 'User already has a premium+ license'}, status=status.HTTP_400_BAD_REQUEST)
            elif current_license_type == 'premium' and item_license == 'premium':
                return Response({'error': 'User already has a premium license'}, status=status.HTTP_400_BAD_REQUEST)

        price_key = f"{item_license}_{item_period}"
        price_id = PRICE_IDS.get(price_key)

        if not price_id:
            return Response({'error': 'Invalid itemLicense or licensePeriod'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if not license.stripe_customer_id:
                customer = stripe.Customer.create(metadata={'userId': account.id})
                license.stripe_customer_id = customer.id
                license.save()

            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price': price_id,
                    'quantity': 1,
                }],
                mode='subscription',
                customer=license.stripe_customer_id,
                billing_address_collection='required',
                metadata={'userId': account.id},
                success_url=os.getenv("STRIPE_SUCCESS_REDIRECT_URL"),
                cancel_url=os.getenv("STRIPE_FAILE_REDIRECT_URL"),
            )

            return Response({'message':'session created successfully','id': session.id})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Cancel Stripe
class CancelSubscriptionAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        try:
            user_id = request.user.id
            account = Account.objects.get(id=user_id)
            license = License.objects.get(account=account)

            if license.stripe_subscription_id:
                try:
                    subscription = stripe.Subscription.delete(license.stripe_subscription_id)
                    
                    if subscription['status'] == 'canceled':
                        license.is_subscription_active = False
                        license.stripe_subscription_id = None
                        license.save()
                        return Response({'message': 'Subscription canceled successfully!'}, status=status.HTTP_200_OK)
                    else:
                        return Response({'error': 'Subscription cancel failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                except stripe.error.StripeError as e:
                    return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({'error': 'subscription not found'}, status=status.HTTP_404_NOT_FOUND)

        except Account.DoesNotExist:
            return Response({'error': 'account not found'}, status=status.HTTP_404_NOT_FOUND)
        except License.DoesNotExist:
            return Response({'error': 'license not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)