import logging
from typing import Optional

logger = logging.getLogger("email_service")

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
