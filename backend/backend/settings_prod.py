import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

DEBUG = False

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

# ALLOWED_HOSTS = []
ALLOWED_HOSTS = [
    os.getenv("ALLOWED_HOST"),
]

CSRF_TRUSTED_ORIGINS = [
    os.getenv("FRONTEND_URL"),
]

STATIC_URL = "static/"
STATIC_ROOT="/usr/share/nginx/html/static"

CORS_ALLOWED_ORIGINS = [  
    os.getenv("FRONTEND_URL"),
]

# LOGGING Settings
LOGGING = {
    'version':1,
    "disable_existing_loggers":False,
    
    # LOGGER
    'loggers':{
        # django
        'django': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # celery
        'celery': {
            'handlers': ['file'],
            'level': 'INFO',
        },
        # accounts
        'accounts': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # meals
        'meals': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # exercises
        'exercises': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # user_details
        'user_details': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # monsters
        'monsters': {
            'handlers':['file'],
            'level': 'INFO',
        },
    },
    
    # handlers
    'handlers': {
        "file": {
            'level':'INFO',
            'class':'logging.handlers.TimedRotatingFileHandler',
            'filename': os.path.join(BASE_DIR,'logs/django.log'),
            'formatter':'prod',
            'when':'D',
            'interval':1,
            'backupCount':7,
        },
    },
    
    # formatter
    'formatters':{
        'prod':{
            'format': '\t'.join([
                '%(asctime)s',
                '[%(levelname)s]',
                '%(pathname)s(Line:%(lineno)d)',
                '%(message)s'
            ])
        },
    }
}

CSRF_COOKIE_SAMESITE = None
CORS_ALLOW_CREDENTIALS = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = "username_email"

LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/"

# Google OAuth2 settings
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        },
        'OAUTH_PKCE_ENABLED': True,
    }
}

# send email (SES)
# EMAIL_BACKEND = 'django_ses.SESBackend'
# AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
# AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
# AWS_SES_REGION_NAME = os.getenv("AWS_SES_REGION_NAME")
# AWS_SES_REGION_ENDPOINT = os.getenv("AWS_SES_REGION_ENDPOINT")
# DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL")

# # send email (Gmail)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv("GMAIL_ADDRESS") 
EMAIL_HOST_PASSWORD = os.getenv("GMAIL_APP_PASS")  
DEFAULT_FROM_EMAIL = os.getenv("GMAIL_ADDRESS") 