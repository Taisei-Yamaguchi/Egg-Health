from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import stripe
import os
from accounts.models import Account
from .models import License
from datetime import datetime, timedelta
from dotenv import load_dotenv
import logging

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# ログの設定
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@csrf_exempt
def stripe_webhook(request):
    print('Webhook received')
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = os.getenv('STRIPE_WEBHOOK_SECRET')

    event = None
    logger.debug('Webhook received')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
        logger.debug(f'Event constructed: {event}')
        print(f'Event constructed: {event}')
    except ValueError as e:
        logger.error(f"ValueError: {e}")
        print(f"ValueError: {e}")
        return JsonResponse({'status': 'invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError as e:
        logger.error(f"SignatureVerificationError: {e}")
        print(f"SignatureVerificationError: {e}")
        return JsonResponse({'status': 'invalid signature'}, status=400)

    # イベントの処理
    try:
        if event['type'] == 'checkout.session.completed':
            logger.debug('Processing checkout.session.completed event')
            print('Processing checkout.session.completed event')
            session = event['data']['object']
            handle_checkout_session(session)
        elif event['type'] == 'invoice.payment_succeeded':
            logger.debug('Processing invoice.payment_succeeded event')
            print('Processing invoice.payment_succeeded event')
            invoice = event['data']['object']
            handle_invoice_payment_succeeded(invoice)
        elif event['type'] == 'invoice.payment_failed':
            logger.debug('Processing invoice.payment_failed event')
            print('Processing invoice.payment_failed event')
            invoice = event['data']['object']
            handle_payment_failed(invoice)
        # customer.subscription.deleted イベントは無視する
        # elif event['type'] == 'customer.subscription.deleted':
        #     logger.debug('Processing customer.subscription.deleted event')
        #     print('Processing customer.subscription.deleted event')
        #     subscription = event['data']['object']
        #     handle_subscription_cancel(subscription)
        # 必要に応じて他のイベントタイプを追加
    except Exception as e:
        logger.error(f"Exception in handling event: {e}")
        print(f"Exception in handling event: {e}")
        return JsonResponse({'status': 'error', 'error': str(e)}, status=500)

    return JsonResponse({'status': 'success'}, status=200)

# 初回契約時
def handle_checkout_session(session):
    try:
        customer_id = session['customer']
        logger.debug(f"Customer ID: {customer_id}")
        print(f"Customer ID: {customer_id}")
        
        license = License.objects.get(stripe_customer_id=customer_id)
        logger.debug(f"License before update: {license}")
        print(f"License before update: {license}")

        # 既存のサブスクリプションがある場合はキャンセル
        if license.stripe_subscription_id:
            try:
                stripe.Subscription.delete(license.stripe_subscription_id)
                logger.debug(f"Deleted existing subscription: {license.stripe_subscription_id}")
                print(f"Deleted existing subscription: {license.stripe_subscription_id}")
            except Exception as e:
                logger.error(f"Error deleting existing subscription: {e}")
                print(f"Error deleting existing subscription: {e}")

        # サブスクリプションキャンセルの処理完了を待ってから新しいサブスクリプションを設定するために少し待つ
        import time
        time.sleep(2)
        
        license.stripe_subscription_id = session['subscription']
        license.is_subscription_active = True
        
        # Line Itemsの取得
        line_items = stripe.checkout.Session.list_line_items(session['id'])
        price_id = line_items['data'][0]['price']['id']
        logger.debug(f"Price ID: {price_id}")
        print(f"Price ID: {price_id}")

        if price_id == os.getenv("STRIPE_PRICE_ID_PREMIUM_MONTH"):
            license.license_type = 'premium'
            license.billing_period = 'monthly'
            license.start_date = datetime.now()
            license.end_date = datetime.now() + timedelta(days=30)
        elif price_id == os.getenv("STRIPE_PRICE_ID_PREMIUM_YEAR"):
            license.license_type = 'premium'
            license.billing_period = 'yearly'
            license.start_date = datetime.now()
            license.end_date = datetime.now() + timedelta(days=365)
        elif price_id == os.getenv("STRIPE_PRICE_ID_PREMIUMPLUS_MONTH"):
            license.license_type = 'premium_plus'
            license.billing_period = 'monthly'
            license.start_date = datetime.now()
            license.end_date = datetime.now() + timedelta(days=30)
        elif price_id == os.getenv("STRIPE_PRICE_ID_PREMIUMPLUS_YEAR"):
            license.license_type = 'premium_plus'
            license.billing_period = 'yearly'
            license.start_date = datetime.now()
            license.end_date = datetime.now() + timedelta(days=365)

        license.save()
        logger.debug(f"License after update: {license}")
        print(f"License after update: {license}")
        
    except Account.DoesNotExist:
        logger.error("Account not found")
        print("Account not found")
    except License.DoesNotExist:
        logger.error("License not found")
        print("License not found")
    except Exception as e:
        logger.error(f"Error in handle_checkout_session: {e}")
        print(f"Error in handle_checkout_session: {e}")


# 契約更新支払い成功時
def handle_invoice_payment_succeeded(invoice):
    try:
        customer_id = invoice['customer']
        logger.debug(f"Customer ID: {customer_id}")
        print(f"Customer ID: {customer_id}")
        
        license = License.objects.get(stripe_customer_id=customer_id)
        logger.debug(f"License before update: {license}")
        print(f"License before update: {license}")
        
        license.is_subscription_active = True
        
        # Line Itemsの取得
        line_items = stripe.Invoice.list_line_items(invoice['id'])
        price_id = line_items['data'][0]['price']['id']
        logger.debug(f"Price ID: {price_id}")
        print(f"Price ID: {price_id}")

        if price_id == os.getenv("STRIPE_PRICE_ID_PREMIUM_MONTH"):
            license.end_date = datetime.now() + timedelta(days=30)
        elif price_id == os.getenv("STRIPE_PRICE_ID_PREMIUM_YEAR"):
            license.end_date = datetime.now() + timedelta(days=365)
        elif price_id == os.getenv("STRIPE_PRICE_ID_PREMIUMPLUS_MONTH"):
            license.end_date = datetime.now() + timedelta(days=30)
        elif price_id == os.getenv("STRIPE_PRICE_ID_PREMIUMPLUS_YEAR"):
            license.end_date = datetime.now() + timedelta(days=365)

        license.save()
        logger.debug(f"License after update: {license}")
        print(f"License after update: {license}")
        
    except Account.DoesNotExist:
        logger.error("Account not found")
        print("Account not found")
    except License.DoesNotExist:
        logger.error("License not found")
        print("License not found")
    except Exception as e:
        logger.error(f"Error in handle_invoice_payment_succeeded: {e}")
        print(f"Error in handle_invoice_payment_succeeded: {e}")

# 契約更新支払い失敗
def handle_payment_failed(invoice):
    try:
        customer_id = invoice['customer']
        logger.debug(f"Customer ID: {customer_id}")
        print(f"Customer ID: {customer_id}")
        
        license = License.objects.get(stripe_customer_id=customer_id)
        logger.debug(f"License before update: {license}")
        print(f"License before update: {license}")

        license.license_type = 'free'
        license.is_subscription_active = False
        license.save()

        logger.debug(f"License after update: {license}")
        print(f"License after update: {license}")
        
    except License.DoesNotExist:
        logger.error("License not found")
        print("License not found")
    except Exception as e:
        logger.error(f"Error in handle_payment_failed: {e}")
        print(f"Error in handle_payment_failed: {e}")

# subsucription cancel
def handle_subscription_cancel(subscription):
    try:
        customer_id = subscription['customer']
        print(customer_id)
        license = License.objects.get(stripe_customer_id=customer_id)
        license.is_subscription_active = False
        license.stripe_subscription_id = None
        license.save()
    except License.DoesNotExist:
        logger.error("License not found")
        print("License not found")
    except Exception as e:
        logger.error(f"Error in handle_subscription_cancel: {e}")
        print(f"Error in handle_subscription_cancel: {e}")

def calculate_end_date(subscription_id):
    subscription = stripe.Subscription.retrieve(subscription_id)
    current_period_end = subscription['current_period_end']
    end_date = datetime.fromtimestamp(current_period_end)
    return end_date
