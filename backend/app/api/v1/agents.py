from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_agents():
    return {"module": "Multi-Agent Orchestrator API", "status": "active"}
