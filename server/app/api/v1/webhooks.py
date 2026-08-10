from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, Request
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
import datetime
import uuid

router = APIRouter()

# In-memory log buffer for demonstration / live stream
inbound_logs_buffer = []

class InboundLeadPayload(BaseModel):
    name: str
    email: EmailStr
    company_name: Optional[str] = "Unknown Corp"
    phone: Optional[str] = None
    requirements: Optional[str] = None
    source: Optional[str] = "Website Embed Form"
    custom_metadata: Optional[Dict[str, Any]] = None

@router.get("/")
async def get_webhooks_info():
    return {
        "module": "Inbound Webhooks & Embed API",
        "status": "active",
        "endpoints": {
            "submit_lead": "/api/v1/webhooks/submit",
            "logs": "/api/v1/webhooks/logs",
            "test": "/api/v1/webhooks/test-payload"
        }
    }

@router.post("/submit")
async def submit_inbound_lead(payload: InboundLeadPayload, request: Request):
    """
    Public endpoint for captured website embed forms and inbound webhook lead dispatches.
    Auto-scores lead qualification and logs the inbound event.
    """
    lead_id = f"lead_{uuid.uuid4().hex[:8]}"
    
    # Calculate initial AI qualification score based on info completeness
    score = 50
    if payload.email and payload.company_name != "Unknown Corp":
        score += 20
    if payload.phone:
        score += 15
    if payload.requirements and len(payload.requirements) > 20:
        score += 15

    log_entry = {
        "id": lead_id,
        "name": payload.name,
        "email": payload.email,
        "company": payload.company_name,
        "phone": payload.phone,
        "requirements": payload.requirements,
        "source": payload.source,
        "score": min(score, 98),
        "status": "qualified" if score >= 70 else "review_needed",
        "received_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "client_ip": request.client.host if request.client else "127.0.0.1"
    }

    inbound_logs_buffer.insert(0, log_entry)

    return {
        "success": True,
        "message": "Inbound lead received and queued for AI qualification",
        "lead_id": lead_id,
        "score": log_entry["score"],
        "status": log_entry["status"]
    }

@router.get("/logs")
async def get_inbound_logs():
    """
    Return live log feed of received inbound leads.
    """
    return {
        "count": len(inbound_logs_buffer),
        "leads": inbound_logs_buffer[:25]
    }

@router.post("/test-payload")
async def trigger_test_payload():
    """
    Trigger a mock inbound lead submission for testing webhooks.
    """
    mock_payload = InboundLeadPayload(
        name="Alexander Vance",
        email="alexander.vance@techcorp.io",
        company_name="TechCorp Dynamics",
        phone="+1 (555) 019-2834",
        requirements="Looking for AI enterprise sales automation platform for a team of 45 SDRs.",
        source="Website Inbound Widget"
    )
    
    lead_id = f"lead_{uuid.uuid4().hex[:8]}"
    log_entry = {
        "id": lead_id,
        "name": mock_payload.name,
        "email": mock_payload.email,
        "company": mock_payload.company_name,
        "phone": mock_payload.phone,
        "requirements": mock_payload.requirements,
        "source": mock_payload.source,
        "score": 92,
        "status": "qualified",
        "received_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "client_ip": "127.0.0.1"
    }

    inbound_logs_buffer.insert(0, log_entry)
    
    return {
        "success": True,
        "message": "Test inbound lead dispatched successfully",
        "lead": log_entry
    }
