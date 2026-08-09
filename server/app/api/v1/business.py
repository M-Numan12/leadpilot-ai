from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import Optional

from app.database.session import get_db
from app.models.user import User
from app.models.membership import Membership
from app.models.business_profile import BusinessProfile
from app.api.dependencies import get_current_user

router = APIRouter()

class BusinessProfileSchema(BaseModel):
    company_name: str
    services_description: str
    target_geography: Optional[str] = None
    target_industries: Optional[str] = None
    pricing_summary: Optional[str] = None
    case_studies: Optional[str] = None
    portfolio_links: Optional[str] = None

    class Config:
        from_attributes = True

@router.get("/profile", response_model=Optional[BusinessProfileSchema])
async def get_business_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Find user org
    mem_result = await db.execute(select(Membership).where(Membership.user_id == current_user.id))
    membership = mem_result.scalars().first()
    if not membership:
        raise HTTPException(status_code=404, detail="No organization membership found")

    result = await db.execute(select(BusinessProfile).where(BusinessProfile.organization_id == membership.organization_id))
    profile = result.scalars().first()
    return profile

@router.post("/profile", response_model=BusinessProfileSchema)
async def save_business_profile(
    req: BusinessProfileSchema,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Find user org
    mem_result = await db.execute(select(Membership).where(Membership.user_id == current_user.id))
    membership = mem_result.scalars().first()
    if not membership:
        raise HTTPException(status_code=404, detail="No organization membership found")

    result = await db.execute(select(BusinessProfile).where(BusinessProfile.organization_id == membership.organization_id))
    profile = result.scalars().first()

    if profile:
        profile.company_name = req.company_name
        profile.services_description = req.services_description
        profile.target_geography = req.target_geography
        profile.target_industries = req.target_industries
        profile.pricing_summary = req.pricing_summary
        profile.case_studies = req.case_studies
        profile.portfolio_links = req.portfolio_links
    else:
        profile = BusinessProfile(
            organization_id=membership.organization_id,
            company_name=req.company_name,
            services_description=req.services_description,
            target_geography=req.target_geography,
            target_industries=req.target_industries,
            pricing_summary=req.pricing_summary,
            case_studies=req.case_studies,
            portfolio_links=req.portfolio_links
        )
        db.add(profile)

    await db.commit()
    await db.refresh(profile)
    return profile
