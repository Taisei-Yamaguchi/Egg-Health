# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-us*to@l%nj+zjprc&5!#9!b&+*3j4hbu8pet5i1v5o^=fxhahh"

ALLOWED_HOSTS = []

CORS_ALLOW_ALL_ORIGINS = True  # allow all origin
CORS_ALLOW_CREDENTIALS = True  

# LOGGING Settings
LOGGING = {
    'version':1,
    # "disable_existing_loggers":False,
    
    # LOGGER
    'loggers':{
        # django
        'django': {
            'handlers':['console'],
            'level': 'INFO',
        },
        'celery': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        # accounts
        'accounts': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
        # meals
        'meals': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
        # exercises
        'exercises': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
        # user_details
        'user_details': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
        # monsters
        'monsters': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
        
    },
    
    # handlers
    'handlers': {
        "console": {
            'level':'DEBUG',
            'class':'logging.StreamHandler',
            'formatter':'dev'
        },
    },
    
    # formatter
    'formatters':{
        'dev':{
            'format': '\t'.join([
                '%(asctime)s',
                '[%(levelname)s]',
                '%(pathname)s(Line:%(lineno)d)',
                '%(message)s'
            ])
        },
    }
}


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


# send email (Console)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'