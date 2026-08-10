import uuid
from sqlalchemy import Column, String, Boolean, Text, DateTime, ForeignKey, func
from app.models.base import Base

class EmbedWidget(Base):
    __tablename__ = "embed_widgets"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    organization_id = Column(String, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String, default="Get a Free AI Assessment", nullable=False)
    description = Column(String, default="Submit your details and our AI agent will analyze your requirements in under 60 seconds.", nullable=True)
    theme = Column(String, default="dark", nullable=False)  # dark, indigo, emerald, sunset
    button_text = Column(String, default="Request AI Analysis ⚡", nullable=False)
    webhook_secret = Column(String, default=lambda: f"whsec_{uuid.uuid4().hex[:16]}", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    allowed_domains = Column(Text, default="*", nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
