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
    "disable_existing_loggers":False,
    
    # LOGGER
    'loggers':{
        # django
        'django': {
            'handlers':['console'],
            'level': 'INFO',
        },
        # accounts
        'accounts': {
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
