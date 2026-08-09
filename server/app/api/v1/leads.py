from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_leads():
    return {"module": "Lead Discovery & Scoring API", "status": "active"}
