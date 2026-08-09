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
    send_registration_otp_email
)

router = APIRouter()

# In-memory OTP storage for demo/dev verification
OTP_STORE = {}

@router.post("/forgot-password/request")
async def request_password_reset_otp(
    req: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.email == req.email))
    user = result.scalars().first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No registered user account found with this email address."
        )
    
    # Generate 6-digit OTP
    otp_code = f"{random.randint(100000, 999999)}"
    OTP_STORE[req.email.lower()] = otp_code
    
    # Dispatch OTP Email
    try:
        send_password_reset_otp_email(user.email, otp_code)
    except Exception as e:
        print(f"OTP dispatch error: {e}")
        
    return {
        "success": True,
        "message": f"6-digit OTP Verification code sent to {user.email}",
        "email": user.email,
        "demo_otp": otp_code  # Provided for easy local UI testing
    }

@router.post("/forgot-password/verify-reset")
async def verify_otp_and_reset_password(
    req: VerifyResetPasswordRequest,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.email == req.email))
    user = result.scalars().first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User account not found"
        )
    
    saved_otp = OTP_STORE.get(req.email.lower())
    # Accept valid saved OTP or default demo OTP 849201
    if not saved_otp or (req.otp_code != saved_otp and req.otp_code != "849201"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired 6-digit OTP verification code."
        )
    
    # Update Password in DB
    user.hashed_password = hash_password(req.new_password)
    await db.commit()
    
    # Clean up OTP
    OTP_STORE.pop(req.email.lower(), None)
    
    return {
        "success": True,
        "message": "Password updated successfully! You can now Sign In with your new password."
    }

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(
    req: RegisterRequest,
    db: AsyncSession = Depends(get_db)
):
    # Check existing user
    result = await db.execute(select(User).where(User.email == req.email))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered"
        )
    
    # Create User
    new_user = User(
        email=req.email,
        hashed_password=hash_password(req.password),
        full_name=req.full_name
    )
    db.add(new_user)
    await db.flush()  # gets user.id
    
    # Create Organization & Membership if provided
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

    # Dispatch Registration Confirmation Email
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
    result = await db.execute(select(User).where(User.email == req.email))
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
        
    # Dispatch Security Login Alert Email
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

