from django.core.mail import send_mail
import os
from django.template.loader import render_to_string
from dotenv import load_dotenv
load_dotenv()

def send_otp_email(email, otp, nickname):
    subject = render_to_string('email/otp_email_subject.txt')
    from_email = os.getenv("GMAIL_ADDRESS")
    recipient_list = [email]

    if not from_email:
        raise ValueError("GMAIL_ADDRESS environment variable is not set")
    
    message = render_to_string('email/otp_email.txt', {
        'nickname': nickname,
        'otp': otp,
    })

    send_mail(subject, message, from_email, recipient_list)