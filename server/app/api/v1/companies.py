from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_companies():
    return {"module": "Company Intelligence API", "status": "active"}
