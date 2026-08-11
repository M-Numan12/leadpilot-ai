from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import router as api_v1_router
from app.database.connection import engine
from app.models.base import Base

# Import all models to ensure they are registered in Base metadata
from app.models.user import User
from app.models.organization import Organization
from app.models.membership import Membership
from app.models.business_profile import BusinessProfile
from app.models.company import Company
from app.models.lead import Lead
from app.models.embed_widget import EmbedWidget

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.connection import AsyncSessionLocal
from app.security.authentication import hash_password

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Seed single Master Super Admin account
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.email == "admin@leadpilot-ai.online"))
        admin_user = result.scalar_one_or_none()
        if not admin_user:
            master_admin = User(
                email="admin@leadpilot-ai.online",
                hashed_password=hash_password("SuperAdmin2026!"),
                full_name="Super Administrator",
                is_active=True,
                is_superuser=True
            )
            session.add(master_admin)
            await session.commit()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Configure CORS for local development and live production frontend domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_v1_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "app": settings.PROJECT_NAME}
