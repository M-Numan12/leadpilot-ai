import uuid
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, func
from app.models.base import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    organization_id = Column(String, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False, index=True)
    domain = Column(String, nullable=True, index=True)
    website_url = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    location = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    emails = Column(Text, nullable=True)  # Comma-separated or JSON list of verified emails
    phones = Column(Text, nullable=True)  # Comma-separated or JSON list of verified phones
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
