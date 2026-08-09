from fastapi import APIRouter
from app.api.v1 import (
    auth, users, organizations, leads, companies, contacts,
    campaigns, conversations, proposals, crm, agents, analytics,
    integrations, webhooks, business
)

router = APIRouter()
router.include_router(auth.router, prefix="/auth", tags=["Auth"])
router.include_router(business.router, prefix="/business", tags=["Business Profile"])
router.include_router(users.router, prefix="/users", tags=["Users"])
router.include_router(organizations.router, prefix="/organizations", tags=["Organizations"])
router.include_router(leads.router, prefix="/leads", tags=["Leads"])
router.include_router(companies.router, prefix="/companies", tags=["Companies"])
router.include_router(contacts.router, prefix="/contacts", tags=["Contacts"])
router.include_router(campaigns.router, prefix="/campaigns", tags=["Campaigns"])
router.include_router(conversations.router, prefix="/conversations", tags=["Conversations"])
router.include_router(proposals.router, prefix="/proposals", tags=["Proposals"])
router.include_router(crm.router, prefix="/crm", tags=["CRM"])
router.include_router(agents.router, prefix="/agents", tags=["Agents"])
router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
router.include_router(integrations.router, prefix="/integrations", tags=["Integrations"])
router.include_router(webhooks.router, prefix="/webhooks", tags=["Webhooks"])
