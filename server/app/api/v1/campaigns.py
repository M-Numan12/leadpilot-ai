from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_campaigns():
    return {"module": "Outreach Campaigns API", "status": "active"}
