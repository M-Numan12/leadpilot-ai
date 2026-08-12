import logging
import json
import urllib.request
import urllib.error
from typing import Optional
from app.core.config import settings

logger = logging.getLogger("email_service")

def dispatch_email_via_resend(to_email: str, subject: str, body_text: str):
    """
    Dispatches real email via Resend API (https://api.resend.com/emails)
    if RESEND_API_KEY is configured in environment / config.py.
    """
    resend_key = settings.RESEND_API_KEY
    if not resend_key:
        logger.info(f"[RESEND BYPASS] RESEND_API_KEY not set. Simulating email send to {to_email}")
        return False

    url = "https://api.resend.com/emails"
    sender_identity = settings.RESEND_FROM_EMAIL or "LeadPilot AI Security <onboarding@resend.dev>"

    payload = {
        "from": sender_identity,
        "to": [to_email],
        "subject": subject,
        "text": body_text
    }


    headers = {
        "Authorization": f"Bearer {resend_key}",
        "Content-Type": "application/json",
        "User-Agent": "ResendPython/1.0.0 (LeadPilotAI)"
    }

    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST"
        )
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            logger.info(f"✅ [RESEND SUCCESS] Email dispatched to {to_email}. ID: {res_data.get('id')}")
            print(f"⚡ [RESEND LIVE DISPATCH] Email sent to {to_email}. Resend ID: {res_data.get('id')}")
            return True
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        logger.error(f"❌ [RESEND HTTP ERROR {e.code}] {error_body}")
        print(f"❌ [RESEND HTTP ERROR {e.code}] {error_body}")
        return False
    except Exception as e:
        logger.error(f"❌ [RESEND ERROR] Failed to dispatch email: {e}")
        print(f"❌ [RESEND ERROR] Failed to dispatch email: {e}")
        return False

def send_password_reset_otp_email(email: str, otp_code: str):
    """
    Dispatches 6-digit OTP code to user email for Password Reset verification.
    Only admin@leadpilot-ai.online routes to numannaeem134@gmail.com; all other users receive OTP at their own email.
    """
    clean_email = email.lower()
    target_recipient = "numannaeem134@gmail.com" if clean_email == "admin@leadpilot-ai.online" else email

    subject = f"🔑 Security Verification: Your LeadPilot AI Password Reset Code is {otp_code}"
    body = (
        f"Dear User,\n\n"
        f"We received a request to reset the password for your LeadPilot AI account ({email}).\n\n"
        f"Your 6-Digit Security Verification Code is:\n"
        f"👉 {otp_code} 👈\n\n"
        f"This verification code is valid for 15 minutes. Please enter this code on the application verification screen to set your new password.\n\n"
        f"Security Notice: If you did not request a password reset, please ignore this message or contact security@leadpilot-ai.online immediately.\n\n"
        f"Best regards,\n"
        f"LeadPilot AI Security Desk\n"
        f"https://www.leadpilot-ai.online"
    )
    logger.info(f"[OTP DISPATCHED] To: {target_recipient} | Subject: {subject}\nBody:\n{body}")
    print(f"\n🔑 [PASSWORD RESET OTP DISPATCH] Email sent to {target_recipient}:\nSubject: {subject}\nOTP Code: {otp_code}\n")

    return dispatch_email_via_resend(target_recipient, subject, body)

def send_password_changed_confirmation_email(email: str, full_name: Optional[str] = None):
    """
    Dispatches a Confirmation email upon successful password update.
    """
    clean_email = email.lower()
    target_recipient = "numannaeem134@gmail.com" if clean_email == "admin@leadpilot-ai.online" else email

    user_name = full_name or email.split("@")[0]
    subject = "🔒 Security Confirmation: Your LeadPilot AI Password Was Successfully Updated"
    body = (
        f"Dear {user_name},\n\n"
        f"This email confirms that the password for your LeadPilot AI account ({email}) has been successfully updated.\n\n"
        f"You can now sign in to your account using your new password:\n"
        f"👉 https://www.leadpilot-ai.online/login\n\n"
        f"Security Notice: If you did not authorize this change, please contact our Security Desk immediately at security@leadpilot-ai.online to secure your account.\n\n"
        f"Best regards,\n"
        f"LeadPilot AI Security Desk\n"
        f"https://www.leadpilot-ai.online"
    )
    logger.info(f"[PASSWORD CHANGED DISPATCHED] To: {target_recipient} | Subject: {subject}")
    print(f"📧 [PASSWORD CHANGED EMAIL] Sent to {target_recipient}:\nSubject: {subject}\n")

    return dispatch_email_via_resend(target_recipient, subject, body)

def send_registration_otp_email(email: str, otp_code: str, full_name: Optional[str] = None):
    user_name = full_name or email.split("@")[0]
    subject = f"⚡ Account Verification: Your LeadPilot AI Verification Code is {otp_code}"
    body = (
        f"Dear {user_name},\n\n"
        f"Welcome to LeadPilot AI!\n\n"
        f"To complete your account registration, please use the following 6-Digit Email Verification Code:\n"
        f"👉 {otp_code} 👈\n\n"
        f"Enter this verification code in the LeadPilot AI application to activate your workspace.\n\n"
        f"Best regards,\n"
        f"LeadPilot AI Operations Team\n"
        f"https://www.leadpilot-ai.online"
    )
    dispatch_email_via_resend(email, subject, body)
    return True

def send_registration_welcome_email(email: str, full_name: Optional[str] = None):
    user_name = full_name or email.split("@")[0]
    subject = "⚡ Welcome to LeadPilot AI – Workspace Activated"
    body = (
        f"Dear {user_name},\n\n"
        f"Congratulations! Your LeadPilot AI workspace account has been successfully created and activated.\n\n"
        f"Account Summary:\n"
        f"• Registered Email: {email}\n"
        f"• AI Prospecting Credits: Unlimited (Admin Allocated)\n"
        f"• Access Tier: Executive Workspace\n\n"
        f"You can now sign in to access your Sales Workspace and AI Prospecting Desk:\n"
        f"👉 https://www.leadpilot-ai.online/login\n\n"
        f"Best regards,\n"
        f"LeadPilot AI Executive Team\n"
        f"https://www.leadpilot-ai.online"
    )
    dispatch_email_via_resend(email, subject, body)
    return True

def send_login_security_email(email: str, full_name: Optional[str] = None):
    user_name = full_name or email.split("@")[0]
    subject = "🛡️ Security Notice: New Sign-In Detected on LeadPilot AI"
    body = (
        f"Dear {user_name},\n\n"
        f"A new successful sign-in was detected for your LeadPilot AI account ({email}).\n\n"
        f"If this sign-in was authorized by you, no further action is required.\n\n"
        f"Security Notice: If you did not sign in recently, please reset your password immediately at https://www.leadpilot-ai.online/forgot-password.\n\n"
        f"Best regards,\n"
        f"LeadPilot AI Security Desk\n"
        f"https://www.leadpilot-ai.online"
    )
    dispatch_email_via_resend(email, subject, body)
    return True

