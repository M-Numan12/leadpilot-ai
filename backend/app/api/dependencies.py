from fastapi import Depends, HTTPException, status

async def get_current_user():
    # Dependency for retrieving authenticated user
    return {"id": "user-123", "email": "user@leadpilot.ai"}
