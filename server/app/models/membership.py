from sqlalchemy import Column, String, DateTime, ForeignKey, func
from app.models.base import Base

class Membership(Base):
    __tablename__ = "memberships"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    organization_id = Column(String, ForeignKey("organizations.id"), nullable=False)
    role = Column(String, default="member")  # owner, admin, member
    created_at = Column(DateTime(timezone=True), server_default=func.now())
