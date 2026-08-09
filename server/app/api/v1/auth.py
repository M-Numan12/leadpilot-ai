from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database.session import get_db
from app.models.user import User
from app.models.organization import Organization
from app.models.membership import Membership
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, UserResponse
from app.security.authentication import (
    hash_password,
    verify_password,
    create_access_token
)
from app.api.dependencies import get_current_user

router = APIRouter()

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
        
    token = create_access_token({"sub": user.id, "email": user.email})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)
