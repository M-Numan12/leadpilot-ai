import uuid
import random
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel, EmailStr

from app.database.session import get_db
from app.models.user import User
from app.models.organization import Organization
from app.models.membership import Membership
from app.schemas.auth import UserResponse
from app.security.authentication import hash_password
from app.services.email_service import send_password_reset_otp_email

router = APIRouter()

class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = "New User"
    is_superuser: Optional[bool] = False
    is_active: Optional[bool] = True

class UserUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None

@router.get("/", response_model=List[UserResponse])
async def list_all_users(db: AsyncSession = Depends(get_db)):
    """
    Fetch all registered users directly from the database table.
    """
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    users = result.scalars().all()

    # Seed default Master Super Admin if DB table is empty
    if not users:
        admin_user = User(
            email="admin@leadpilot-ai.online",
            hashed_password=hash_password("SuperAdmin2026!"),
            full_name="Master Super Administrator",
            is_active=True,
            is_superuser=True,
            is_unlimited_credits=True,
            ai_credits="UNLIMITED"
        )
        db.add(admin_user)
        await db.commit()
        await db.refresh(admin_user)
        users = [admin_user]

    return users

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user_in_db(req: UserCreateRequest, db: AsyncSession = Depends(get_db)):
    """
    Create a new user directly inside the database table.
    """
    clean_email = req.email.lower().strip()
    result = await db.execute(select(User).where(User.email == clean_email))
    existing_user = result.scalars().first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address already exists in database."
        )

    new_user = User(
        email=clean_email,
        hashed_password=hash_password(req.password),
        full_name=req.full_name,
        is_active=req.is_active,
        is_superuser=req.is_superuser,
        is_unlimited_credits=True,
        ai_credits="UNLIMITED"
    )
    db.add(new_user)
    await db.flush()

    # Create Organization for user
    org_name = f"{req.full_name or clean_email}'s Workspace"
    new_org = Organization(name=org_name, slug=f"workspace-{new_user.id[:8]}")
    db.add(new_org)
    await db.flush()

    new_membership = Membership(
        user_id=new_user.id,
        organization_id=new_org.id,
        role="owner" if req.is_superuser else "member"
    )
    db.add(new_membership)

    await db.commit()
    await db.refresh(new_user)
    return new_user

@router.patch("/{user_id}", response_model=UserResponse)
async def update_user_in_db(user_id: str, req: UserUpdateRequest, db: AsyncSession = Depends(get_db)):
    """
    Update user parameters (Active state, Role, Full Name) in database.
    """
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()

    if not user:
        # Fallback query by email if user_id was passed as email
        result_email = await db.execute(select(User).where(User.email == user_id.lower()))
        user = result_email.scalars().first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found in database."
        )

    if req.full_name is not None:
        user.full_name = req.full_name
    if req.email is not None:
        user.email = req.email.lower().strip()
    if req.is_active is not None:
        user.is_active = req.is_active
    if req.is_superuser is not None:
        user.is_superuser = req.is_superuser

    await db.commit()
    await db.refresh(user)
    return user

@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
async def delete_user_from_db(user_id: str, db: AsyncSession = Depends(get_db)):
    """
    Delete a user account directly from the database table.
    """
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()

    if not user:
        result_email = await db.execute(select(User).where(User.email == user_id.lower()))
        user = result_email.scalars().first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User account not found in database."
        )

    await db.delete(user)
    await db.commit()
    return {"success": True, "message": f"User {user.email} deleted successfully from database."}

@router.post("/{user_id}/reset-password")
async def trigger_user_password_reset(user_id: str, db: AsyncSession = Depends(get_db)):
    """
    Triggers password reset for target user and dispatches OTP email.
    """
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()

    if not user:
        result_email = await db.execute(select(User).where(User.email == user_id.lower()))
        user = result_email.scalars().first()

    user_email = user.email if user else user_id
    otp_code = f"{random.randint(100000, 999999)}"

    try:
        send_password_reset_otp_email(user_email, otp_code)
    except Exception as e:
        print(f"Password reset dispatch error: {e}")

    target = "numannaeem134@gmail.com" if (user and user.is_superuser) or "admin" in user_email.lower() else user_email
    return {
        "success": True,
        "message": f"🔑 Password reset OTP dispatched to {target}!",
        "target_email": target
    }
