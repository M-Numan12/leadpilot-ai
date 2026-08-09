import uuid
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, func
from app.models.base import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    organization_id = Column(String, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    company_id = Column(String, ForeignKey("companies.id", ondelete="CASCADE"), nullable=False, index=True)
    score = Column(Integer, default=50, nullable=False)  # 90 = High, 70 = Good, 50 = Medium, 30 = Low
    qualification_reason = Column(Text, nullable=True)
    crm_stage = Column(String, default="discovered", nullable=False, index=True) 
    # Stages: discovered -> qualified -> contacted -> replied -> meeting -> proposal -> won -> lost
    proposal_draft = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
