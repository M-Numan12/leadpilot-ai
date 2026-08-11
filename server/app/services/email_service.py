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
    payload = {
        "from": settings.RESEND_FROM_EMAIL or "LeadPilot AI <numan@leadpilot-ai.online>",
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


    subject = f"🔑 Password Reset Verification Code: {otp_code} - LeadPilot AI"
    body = (
        f"Assalam-o-Alaikum,\n\n"
        f"Aap ke LeadPilot AI account ({email}) par Password Reset request receive hui hai.\n\n"
        f"Aapka 6-Digit OTP Verification Code:\n"
        f"👉 {otp_code} 👈\n\n"
        f"Yeh code 15 minute ke liye valid hai. App mein yeh 6-digit code enter karke naya password set karein.\n\n"
        f"Agar aap ne yeh request nahi ki thi, toh kisi ke saath yeh code share na karein.\n\n"
        f"Regards,\n"
        f"LeadPilot AI Security Desk"
    )
    logger.info(f"[OTP DISPATCHED] To: {target_recipient} | Subject: {subject}\nBody:\n{body}")
    print(f"\n🔑 [PASSWORD RESET OTP DISPATCH] Email sent to {target_recipient}:\nSubject: {subject}\nOTP Code: {otp_code}\n")
    
    # Send via Resend
    return dispatch_email_via_resend(target_recipient, subject, body)

def send_password_changed_confirmation_email(email: str, full_name: Optional[str] = None):
    """
    Dispatches a Confirmation email upon successful password update.
    """
    user_name = full_name or email.split("@")[0]
    subject = "🔒 Security Alert: Your LeadPilot AI Password Was Successfully Updated"
    body = (
        f"Hello {user_name},\n\n"
        f"Aap ke LeadPilot AI account ({email}) ka password successfully change aur update kar diya gaya hai.\n\n"
        f"Aap ab apne naye password ke saath Sign In kar sakte hain:\n"
        f"👉 https://www.leadpilot-ai.online/login 👈\n\n"
        f"Agar aap ne yeh change nahi kiya tha, toh fawran humari support team se rabta karein.\n\n"
        f"Regards,\n"
        f"LeadPilot AI Security Desk"
    )
    logger.info(f"[PASSWORD CHANGED DISPATCHED] To: {email} | Subject: {subject}")
    print(f"📧 [PASSWORD CHANGED EMAIL] Sent to {email}:\nSubject: {subject}\n")
    
    dispatch_email_via_resend(email, subject, body)
    return True

def send_registration_otp_email(email: str, otp_code: str, full_name: Optional[str] = None):
    user_name = full_name or email.split("@")[0]
    subject = f"⚡ Registration OTP Code: {otp_code} - LeadPilot AI"
    body = (
        f"Assalam-o-Alaikum & Welcome {user_name}!\n\n"
        f"LeadPilot AI par naya account create karne ke liye aapka Email Verification Code:\n"
        f"👉 {otp_code} 👈\n\n"
        f"Is code ko app mein enter karke apni registration complete karein.\n\n"
        f"Regards,\n"
        f"LeadPilot AI Team"
    )
    dispatch_email_via_resend(email, subject, body)
    return True

def send_registration_welcome_email(email: str, full_name: Optional[str] = None):
    user_name = full_name or email.split("@")[0]
    subject = "⚡ Registration Successful – Welcome to LeadPilot AI!"
    body = (
        f"Assalam-o-Alaikum & Welcome {user_name}!\n\n"
        f"Aap ki LeadPilot AI par registration complete ho gayi hai.\n\n"
        f"Account Credentials:\n"
        f"• Email: {email}\n"
        f"• AI Research Credits: Unlimited (Granted by Admin)\n\n"
        f"Aap ab system par Sign In kar ke apna Sales Workspace aur AI Research Desk use kar sakte hain.\n\n"
        f"Regards,\n"
        f"LeadPilot AI Team"
    )
    dispatch_email_via_resend(email, subject, body)
    return True

def send_login_security_email(email: str, full_name: Optional[str] = None):
    user_name = full_name or email.split("@")[0]
    subject = "🛡️ Security Alert: New Login Detected on LeadPilot AI"
    body = (
        f"Hello {user_name},\n\n"
        f"Aap ke LeadPilot AI account ({email}) par naya successful Sign In detected hua hai.\n\n"
        f"Agar yeh aap ne hi login kiya hai, toh koi action lene ki zaroorat nahi hai.\n\n"
        f"Regards,\n"
        f"LeadPilot AI Security Desk"
    )
    dispatch_email_via_resend(email, subject, body)
    return True
