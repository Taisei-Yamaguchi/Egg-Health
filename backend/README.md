# Backend Django
## pip install
>
  pip install django
  pip install psycopg2-binary
  pip install djangorestframework
  pip install itsdangerous
  pip install django-cors-headers
  pip install python-dotenv
  pip install requests
  pip install celery
  pip install django-celery-results
  pip install django-celery-beat
  pip install redis
  pip install django-allauth
  pip install kombu
  
  pip install pyjwt
  pip install cryptography 
  pip install boto3 django-ses
  pip install stripe
  <!-- - cloudinary -->
  <!-- - channels -->
  <!-- - uvicorn -->

## tmuxで実行
  - celery -A backend worker --loglevel=info
  - celery -A backend beat --loglevel=info