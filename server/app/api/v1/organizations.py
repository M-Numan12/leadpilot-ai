from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_organizations():
    return {"module": "Organization Management API", "status": "active"}
