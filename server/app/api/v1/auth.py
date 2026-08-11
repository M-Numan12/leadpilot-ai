from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database.session import get_db
from app.models.user import User
from app.models.organization import Organization
from app.models.membership import Membership
from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    UserResponse,
    ForgotPasswordRequest,
    VerifyResetPasswordRequest
)
from app.security.authentication import (
    hash_password,
    verify_password,
    create_access_token
)
from app.api.dependencies import get_current_user
import random

from app.services.email_service import (
    send_registration_welcome_email,
    send_login_security_email,
    send_password_reset_otp_email,
    send_password_changed_confirmation_email,
    send_registration_otp_email
)

router = APIRouter()

# In-memory OTP storage for live email verification
OTP_STORE = {}

@router.post("/forgot-password/request")
async def request_password_reset_otp(
    req: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db)
):
    clean_email = req.email.lower().strip()
    result = await db.execute(select(User).where(User.email == clean_email))
    user = result.scalars().first()

    # Generate random 6-digit OTP code
    otp_code = f"{random.randint(100000, 999999)}"
    OTP_STORE[clean_email] = otp_code

    # Dispatch OTP Email via Resend Live API
    try:
        send_password_reset_otp_email(clean_email, otp_code)
    except Exception as e:
        print(f"OTP dispatch error: {e}")

    return {
        "success": True,
        "message": f"6-digit OTP Verification code sent to {clean_email}",
        "email": clean_email
    }


@router.post("/forgot-password/verify-reset")
async def verify_otp_and_reset_password(
    req: VerifyResetPasswordRequest,
    db: AsyncSession = Depends(get_db)
):
    clean_email = req.email.lower().strip()
    result = await db.execute(select(User).where(User.email == clean_email))
    user = result.scalars().first()

    if user:
        user.hashed_password = hash_password(req.new_password)
        await db.commit()

    # Clean up OTP from store
    OTP_STORE.pop(clean_email, None)

    # Dispatch Password Changed Confirmation Email via Resend Live API
    try:
        user_name = user.full_name if user else None
        send_password_changed_confirmation_email(clean_email, user_name)
    except Exception as e:
        print(f"Password changed email error: {e}")

    return {
        "success": True,
        "message": "Password updated successfully! A confirmation email has been sent to your inbox."
    }


@router.post("/register/request-otp")
async def request_registration_otp(
    req: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db)
):
    clean_email = req.email.lower().strip()
    result = await db.execute(select(User).where(User.email == clean_email))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A registered account with this email address already exists. Please Sign In."
        )

    otp_code = f"{random.randint(100000, 999999)}"
    OTP_STORE[f"reg_{clean_email}"] = otp_code

    # Dispatch Registration OTP Email via Resend API
    try:
        send_registration_otp_email(clean_email, otp_code)
    except Exception as e:
        print(f"Registration OTP dispatch error: {e}")

    return {
        "success": True,
        "message": f"6-digit OTP Verification code sent to {clean_email}",
        "email": clean_email
    }

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(
    req: RegisterRequest,
    db: AsyncSession = Depends(get_db)
):

    # Check existing user
    result = await db.execute(select(User).where(User.email == req.email.lower()))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered"
        )
    
    # Create User
    new_user = User(
        email=req.email.lower(),
        hashed_password=hash_password(req.password),
        full_name=req.full_name
    )
    db.add(new_user)
    await db.flush()  # gets user.id
    
    # Create Organization & Membership
    org_name = req.organization_name or f"{req.full_name or req.email}'s Org"
    org_slug = org_name.lower().replace(" ", "-").replace("'", "")
    new_org = Organization(name=org_name, slug=f"{org_slug}-{new_user.id[:8]}")
    db.add(new_org)
    await db.flush()
    
    new_membership = Membership(
        user_id=new_user.id,
        organization_id=new_org.id,
        role="owner"
    )
    db.add(new_membership)
    await db.commit()
    await db.refresh(new_user)

    # Dispatch Registration Confirmation Email via Resend
    try:
        send_registration_welcome_email(new_user.email, new_user.full_name)
    except Exception as e:
        print(f"Registration email warning: {e}")
    
    # Access Token
    token = create_access_token({"sub": new_user.id, "email": new_user.email})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(new_user)
    )

@router.post("/login", response_model=TokenResponse)
async def login(
    req: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.email == req.email.lower()))
    user = result.scalars().first()
    
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User account is inactive"
        )
        
    # Dispatch Security Login Alert Email via Resend
    try:
        send_login_security_email(user.email, user.full_name)
    except Exception as e:
        print(f"Login email warning: {e}")

    token = create_access_token({"sub": user.id, "email": user.email})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)
