import uuid
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, func
from app.models.base import Base

class BusinessProfile(Base):
    __tablename__ = "business_profiles"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    organization_id = Column(String, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    company_name = Column(String, nullable=False)
    services_description = Column(Text, nullable=False)
    target_geography = Column(String, nullable=True)  # e.g., USA, UK, Global
    target_industries = Column(String, nullable=True)  # e.g., E-commerce, Real Estate, Healthcare
    pricing_summary = Column(Text, nullable=True)
    case_studies = Column(Text, nullable=True)
    portfolio_links = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
