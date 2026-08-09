from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "LeadPilot AI"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "default_secret_key"
    DATABASE_URL: str = "postgresql+asyncpg://leadpilot:leadpilotpass@localhost:5432/leadpilot_db"
    REDIS_URL: str = "redis://localhost:6379/0"
    OPENAI_API_KEY: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
