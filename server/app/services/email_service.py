import logging
from typing import Optional

logger = logging.getLogger("email_service")

def send_password_reset_otp_email(email: str, otp_code: str):
    """
    Dispatches 6-digit OTP code to user email for Password Reset verification.
    """
    subject = f"🔑 Password Reset Verification Code: {otp_code} - LeadPilot AI"
    body = (
        f"Assalam-o-Alaikum,\n\n"
        f"Aap ke LeadPilot AI account ({email}) par Password Reset request receive hui hai.\n\n"
        f"Aapka 6-Digit OTP Verification Code:\n"
        f"👉 {otp_code} 👈\n\n"
        f"Yeh code 15 minute ke liye valid hai. App mein yeh 6-digit code enter karke naya password set karein.\n\n"
        f"Agar aap ne yeh request nahi ki thi, toh is email ko ignore karein.\n\n"
        f"Regards,\n"
        f"LeadPilot AI Security Desk"
    )
    logger.info(f"[OTP DISPATCHED] To: {email} | Subject: {subject}\nBody:\n{body}")
    print(f"\n🔑 [PASSWORD RESET OTP DISPATCH] Email sent to {email}:\nSubject: {subject}\nOTP Code: {otp_code}\n")
    return True

def send_registration_otp_email(email: str, otp_code: str, full_name: Optional[str] = None):
    """
    Dispatches 6-digit Email Verification OTP code for new user registration.
    """
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
    logger.info(f"[OTP DISPATCHED] To: {email} | Subject: {subject}\nBody:\n{body}")
    print(f"\n⚡ [REGISTRATION OTP DISPATCH] Email sent to {email}:\nSubject: {subject}\nOTP Code: {otp_code}\n")
    return True

def send_registration_welcome_email(email: str, full_name: Optional[str] = None):
    """
    Dispatches a Registration Confirmation email to the newly registered user.
    """
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
    logger.info(f"[EMAIL DISPATCHED] To: {email} | Subject: {subject}\nBody:\n{body}")
    print(f"📧 [NOTIFICATION DISPATCH] Email sent to {email}:\nSubject: {subject}\n{body}\n")
    return True

def send_login_security_email(email: str, full_name: Optional[str] = None):
    """
    Dispatches a Security Notification email upon successful user login.
    """
    user_name = full_name or email.split("@")[0]
    subject = "🛡️ Security Alert: New Login Detected on LeadPilot AI"
    body = (
        f"Hello {user_name},\n\n"
        f"Aap ke LeadPilot AI account ({email}) par naya successful Sign In detected hua hai.\n\n"
        f"Agar yeh aap ne hi login kiya hai, toh koi action lene ki zaroorat nahi hai.\n\n"
        f"Regards,\n"
        f"LeadPilot AI Security Desk"
    )
    logger.info(f"[EMAIL DISPATCHED] To: {email} | Subject: {subject}\nBody:\n{body}")
    print(f"📧 [SECURITY DISPATCH] Email sent to {email}:\nSubject: {subject}\n{body}\n")
    return True
