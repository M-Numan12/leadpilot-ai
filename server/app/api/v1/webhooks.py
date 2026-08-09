from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_webhooks():
    return {"module": "Inbound Webhooks API", "status": "active"}
