from .models import Account
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import random
import string
from django.utils import timezone
from datetime import timedelta
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate,login,logout
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import AccountSerializer
from .helpers.encrypt_uid import generate_secure_token, verify_secure_token
import requests
from monsters.models import Monster, MonsterSelected

#Sign Up
class SignUpAPIView(APIView):
    def post(self, request):
        nickname = request.data.get('nickname')
        username = request.data.get('username')
        password = request.data.get('password')
        # when nickname, username, password is null, response error
        if not nickname or not username or not password:
            return Response({'error': 'Nickname, email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        # if username is already registered but not verified, delete here.
        existing_user = Account.objects.filter(username=username).first()
        if existing_user:
            if not existing_user.email_verified:
                existing_user.delete()
            else:
                return Response({'error': 'This email is already used.'}, status=status.HTTP_400_BAD_REQUEST)
        
        otp=''.join(random.choices(string.digits, k=6))
        otp_created_at = timezone.now()
        new_account = Account(
            username=username,
            email=username,
            nickname=nickname,
            otp=otp,
            otp_created_at=otp_created_at,
        )
        new_account.set_password(password)
        new_account.save()
        secure_id = generate_secure_token(new_account.id)
        
        # Send OTP email (you need to implement this function)
        print("OTP: ",otp)
        return Response({
            'message': 'Account created. Please check your email for the OTP.',
            'uid': secure_id    
            }, status=status.HTTP_201_CREATED)
    
# Verify Email
class VerifyEmailAPIView(APIView):
    def post(self, request):
        uid = request.data.get('uid')
        otp = request.data.get('otp')
        if not uid or not otp:
            return Response({'error': 'uid and otp ie required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_id = verify_secure_token(uid)
        if not user_id:
            return Response({'error': "Invalid or expired uid."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            account = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            return Response({'error': "This user doesn't exist."}, status=status.HTTP_400_BAD_REQUEST)
        
        if account.otp == otp:
            current_time = timezone.now()
            otp_validity_duration = timedelta(minutes=5)

            if account.otp_created_at and (current_time - account.otp_created_at) <= otp_validity_duration:
                account.email_verified = True
                account.otp = None  # Clear the OTP after successful verification
                account.otp_created_at = None  # Clear the OTP created time
                account.save()
                
                # create Monster and MonsterSelected with new account
                Monster.objects.create(account=account, monster_type='Normal')
                MonsterSelected.objects.create(account=account, selected_monster='Normal', selected_stage=0)

                # auth
                login(request, account,backend='django.contrib.auth.backends.ModelBackend')
                token, created = Token.objects.get_or_create(user=account)
                return Response(
                    {'message': 'Email confirmed successfully.',
                    'account':{'id':account.id,'nickname':account.nickname,'username':account.username},
                    'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'OTP has expired.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        
# SignIn
class SignInAPIView(APIView):
    def post(self, request):
        username= request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if user is not None:
            # when success, return token
            account = Account.objects.get(username=username)
            if account.is_active and account.email_verified:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'message': "Signed in successfully!",
                    'account':{'id':account.id,'nickname':account.nickname,'username':account.username},
                    'token': token.key},
                    status=status.HTTP_200_OK)
            else:
                return Response({'error': 'This account is not currenly available.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # when failed, return error
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

# Logout
class LogoutAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        # get token
        token = request.auth
        if token:
            token.delete()
        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)
    
# Update Account
class UpdateAccountAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        user = request.user
        serializer = AccountSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            updated_user = serializer.save()
            data = {
                'id': updated_user.id,
                'nickname': updated_user.nickname,
                'username': updated_user.username,
            }
            return Response({'message': 'Account updated successfully.', 'data': data}, status=status.HTTP_200_OK)
        
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
# Get Account
class GetAccountAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        data = {
            'id': user.id,
            'nickname': user.nickname,
            'username': user.username,
        }
        return Response({'message': 'Account get successfully',"data" : data}, status=status.HTTP_200_OK)


# delete account
class DeleteAccountAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        user = request.user
        user.delete()
        return Response({'message': 'Account has been deleted successfully.'}, status=status.HTTP_200_OK)

def verify_google_token(token):
    try:
        response = requests.get(f'https://oauth2.googleapis.com/tokeninfo?id_token={token}')
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error verifying Google token: {e}")
        return None

class GoogleSignInAPIView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        user_info = verify_google_token(token)
        if not user_info:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        
        email = user_info.get('email')
        name = user_info.get('name')
        
        account, created = Account.objects.get_or_create(email=email, defaults={'username': email, 'nickname': name, 'email_verified': True, 'is_google': True})
        if created:
            account.set_unusable_password()
            account.save()
            # create Monster and MonsterSelected with new account
            Monster.objects.create(account=account, monster_type='Normal')
            MonsterSelected.objects.create(account=account, selected_monster='Normal', selected_stage=0)
            print('Monster created!!!!')
        account.email_verified = True
        account.save()

        if account.is_active and account.email_verified:
            login(request, account, backend='django.contrib.auth.backends.ModelBackend')
            token, _ = Token.objects.get_or_create(user=account)
            return Response({
                'message': "Signed in successfully!",
                'account': {'id': account.id, 'nickname': account.nickname, 'username': account.username},
                'token': token.key},
                status=status.HTTP_200_OK)
        else:
            return Response({'error': 'This account is not currently available.'}, status=status.HTTP_401_UNAUTHORIZED)