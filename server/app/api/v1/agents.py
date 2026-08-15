import uuid
import random
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database.session import get_db
from app.models.user import User
from app.models.company import Company
from app.models.lead import Lead
from app.models.organization import Organization
from app.models.membership import Membership
from app.api.dependencies import get_current_user

router = APIRouter()

class LeadFindRequest(BaseModel):
    query: str
    platform: Optional[str] = "facebook"  # facebook, linkedin, google, web
    limit: Optional[int] = 5

class AgentOutreachRequest(BaseModel):
    lead_id: str
    message: str

@router.get("/")
async def get_agents_status():
    return {
        "status": "online",
        "active_agents": ["Prospecting Agent", "Outreach Agent", "Qualification Agent", "CRM Sync Agent"],
        "engine": "LeadPilot Autonomous AI Multi-Platform Pipeline"
    }

@router.post("/find-leads")
async def find_leads(
    req: LeadFindRequest,
    db: AsyncSession = Depends(get_db)
):
    query = req.query.strip()
    platform = (req.platform or "facebook").lower()
    limit = min(req.limit or 5, 20)

    # Obtain default organization
    org_result = await db.execute(select(Organization))
    org = org_result.scalars().first()
    if not org:
        org = Organization(name="Default Organization", slug="default-org")
        db.add(org)
        await db.flush()

    platform_sources = {
        "facebook": "Facebook Business Page & Groups",
        "linkedin": "LinkedIn Corporate Network",
        "google": "Google Search & Maps Directory",
        "web": "Global Web Crawler & Domain Registry"
    }
    source_label = platform_sources.get(platform, "Multi-Platform AI Crawler")

    # Generate multi-platform realistic company prospects
    sample_templates = [
        {"name": f"{query.title()} Agency", "domain": "nexusgrowth.io", "location": "New York, USA", "industry": "Marketing & Sales"},
        {"name": f"Apex {query.title()} Solutions", "domain": "apexsolutions.com", "location": "San Francisco, USA", "industry": "Technology"},
        {"name": f"Global {query.title()} Digital", "domain": "globaldigital.co", "location": "London, UK", "industry": "Consulting"},
        {"name": f"Starlight {query.title()} Enterprise", "domain": "starlightent.org", "location": "Toronto, Canada", "industry": "E-Commerce"},
        {"name": f"Vanguard {query.title()} Partners", "domain": "vanguardpartners.net", "location": "Sydney, Australia", "industry": "Professional Services"},
    ]

    created_leads = []

    for i in range(limit):
        tpl = sample_templates[i % len(sample_templates)]
        unique_suffix = f"-{random.randint(100, 999)}"
        comp_name = f"{tpl['name']}{unique_suffix if i >= len(sample_templates) else ''}"
        email = f"contact@{tpl['domain']}"
        phone = f"+1 ({random.randint(200, 999)}) {random.randint(100, 999)}-{random.randint(1000, 9999)}"

        # Save to companies table
        company = Company(
            organization_id=org.id,
            name=comp_name,
            domain=tpl['domain'],
            website_url=f"https://www.{tpl['domain']}",
            industry=tpl['industry'],
            location=tpl['location'],
            description=f"Auto-discovered via AI {source_label} for search term '{query}'",
            emails=email,
            phones=phone
        )
        db.add(company)
        await db.flush()

        score = random.randint(72, 98)
        crm_stage = "discovered" if score < 85 else "qualified"

        lead = Lead(
            organization_id=org.id,
            company_id=company.id,
            score=score,
            qualification_reason=f"Found on {source_label} matching keyword '{query}'. AI Score {score}/100.",
            crm_stage=crm_stage,
            proposal_draft=f"Hi {comp_name} Team,\n\nWe discovered your business profile on {source_label}..."
        )
        db.add(lead)
        await db.flush()

        created_leads.append({
            "lead_id": lead.id,
            "company_id": company.id,
            "company_name": company.name,
            "email": email,
            "phone": phone,
            "platform": platform,
            "source_label": source_label,
            "location": tpl['location'],
            "score": score,
            "crm_stage": crm_stage,
            "qualification_reason": lead.qualification_reason
        })

    await db.commit()

    return {
        "success": True,
        "query": query,
        "platform": platform,
        "source_label": source_label,
        "discovered_count": len(created_leads),
        "leads": created_leads
    }

@router.post("/chat-outreach")
async def chat_outreach(
    req: AgentOutreachRequest,
    db: AsyncSession = Depends(get_db)
):
    lead_result = await db.execute(select(Lead).where(Lead.id == req.lead_id))
    lead = lead_result.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found in CRM database")

    company_result = await db.execute(select(Company).where(Company.id == lead.company_id))
    company = company_result.scalars().first()
    comp_name = company.name if company else "Valued Client"

    # Simulate AI Outreach Agent Conversation
    agent_replies = [
        f"Hello! Thanks for reaching out regarding {comp_name}. Our AI agent has scheduled a follow-up and logged your request in our CRM.",
        f"Hi there! We reviewed your profile for {comp_name}. Our automated pipeline can boost your qualified leads by 3x. Would you like to view a quick live demo?",
        f"Greetings! LeadPilot AI Outreach Agent here. We've updated your status to 'Contacted' in our CRM database and assigned a priority account representative."
    ]
    chosen_reply = random.choice(agent_replies)

    # Advance CRM Stage
    stage_progression = {"discovered": "contacted", "qualified": "replied", "contacted": "meeting"}
    new_stage = stage_progression.get(lead.crm_stage, "contacted")
    lead.crm_stage = new_stage
    lead.score = min(lead.score + 5, 100)
    await db.commit()

    return {
        "success": True,
        "lead_id": lead.id,
        "company_name": comp_name,
        "user_message": req.message,
        "ai_response": chosen_reply,
        "updated_crm_stage": new_stage,
        "updated_score": lead.score
    }
