# Backend Django
## pip install
>
  - django
  - psycopg2-binary
  - djangorestframework
  - itsdangerous
  - django-cors-headers
  - python-dotenv
  - requests
  pip install celery
  pip install django-celery-results
  pip install django-celery-beat
  redis
  django-allauth
  pip install pyjwt
  pip install cryptography 
  pip install boto3 django-ses

  <!-- - cloudinary -->
  <!-- - channels -->
  <!-- - uvicorn -->

## tmuxで実行
  - celery -A backend worker --loglevel=info
  - celery -A backend beat --loglevel=info