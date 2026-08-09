from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_conversations():
    return {"module": "Client Conversations API", "status": "active"}
