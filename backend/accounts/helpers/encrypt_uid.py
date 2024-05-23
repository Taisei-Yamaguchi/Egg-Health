from itsdangerous import URLSafeSerializer
from django.conf import settings

def generate_secure_token(user_id):
    serializer = URLSafeSerializer(settings.SECRET_KEY)
    return serializer.dumps(user_id)

def verify_secure_token(token):
    serializer = URLSafeSerializer(settings.SECRET_KEY)
    try:
        user_id = serializer.loads(token)
        return user_id
    except:
        return None
