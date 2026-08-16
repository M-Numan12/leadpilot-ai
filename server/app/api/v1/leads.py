from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database.session import get_db
from app.models.lead import Lead
from app.models.company import Company
from app.models.organization import Organization

router = APIRouter()

class LeadStageUpdateRequest(BaseModel):
    crm_stage: str

@router.get("/")
async def list_all_leads(db: AsyncSession = Depends(get_db)):
    # Join leads with companies
    result = await db.execute(
        select(Lead, Company)
        .join(Company, Lead.company_id == Company.id)
        .order_by(Lead.created_at.desc())
    )
    rows = result.all()

    leads_data = []
    for lead, company in rows:
        leads_data.append({
            "id": lead.id,
            "lead_id": lead.id,
            "company_id": company.id,
            "company_name": company.name,
            "domain": company.domain,
            "website_url": company.website_url,
            "industry": company.industry,
            "location": company.location,
            "email": company.emails,
            "emails": company.emails,
            "phone": company.phones,
            "phones": company.phones,
            "score": lead.score,
            "qualification_reason": lead.qualification_reason,
            "proposal_draft": lead.proposal_draft,
            "crm_stage": lead.crm_stage,
            "created_at": lead.created_at.isoformat() if lead.created_at else None
        })

    return {
        "success": True,
        "total": len(leads_data),
        "leads": leads_data
    }

@router.patch("/{lead_id}/stage")
async def update_lead_stage(
    lead_id: str,
    req: LeadStageUpdateRequest,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    lead.crm_stage = req.crm_stage.lower()
    await db.commit()

    return {
        "success": True,
        "lead_id": lead.id,
        "crm_stage": lead.crm_stage
    }

@router.delete("/{lead_id}")
async def delete_lead(lead_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    await db.delete(lead)
    await db.commit()
    return {"success": True, "message": "Lead deleted from CRM database"}
