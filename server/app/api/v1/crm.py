from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_crm():
    return {"module": "CRM Deals & Pipeline API", "status": "active"}
