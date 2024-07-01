from celery import shared_task
from datetime import datetime
from .models import License

@shared_task
def check_and_update_licenses():
    today = datetime.now().date()
    print(today)
    licenses_to_update = License.objects.filter(
        is_subscription_active=False,
        license_type__in=['premium', 'premium_plus'],
        end_date__lt=today
    )
    
    for license in licenses_to_update:
        try:
            license.license_type = 'free'
            license.save()
        except Exception as e:
            print('error')