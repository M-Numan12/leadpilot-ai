from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_contacts():
    return {"module": "Contacts Directory API", "status": "active"}
