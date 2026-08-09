from sqlalchemy import Column, String, DateTime, func
from app.models.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
