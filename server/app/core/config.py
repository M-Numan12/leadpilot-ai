import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "LeadPilot AI"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "leadpilot_super_secret_jwt_key_2026"
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite+aiosqlite:///./leadpilot.db"
    )
    REDIS_URL: str = "redis://localhost:6379/0"
    OPENAI_API_KEY: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
