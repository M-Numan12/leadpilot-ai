#!/usr/bin/env python3
"""
Neon DB Serverless PostgreSQL Automatic Initialization & Super Admin Seeding Script
"""

import sys
import os
import asyncio
import time
import uuid

# Ensure UTF-8 output encoding on Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

# Add server directory to python path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "server"))

from sqlalchemy import text, select
from app.database.connection import engine, AsyncSessionLocal
from app.models.base import Base
from app.models.user import User
from app.models.organization import Organization
from app.models.membership import Membership
from app.security.authentication import hash_password

async def init_neon_database():
    print("=" * 65)
    print("⚡ LeadPilot AI - Live Neon DB PostgreSQL & Super Admin Seeding")
    print("=" * 65)

    db_url = str(engine.url)
    masked_url = db_url.split("@")[-1] if "@" in db_url else "SQLite Local"
    print(f"➜ Target Database Endpoint: {masked_url}")

    start_time = time.time()
    try:
        async with engine.begin() as conn:
            print("➜ Checking live Neon PostgreSQL connection ping...")
            await conn.execute(text("SELECT 1;"))
            ping = (time.time() - start_time) * 1000
            print(f"✔ Live Connection Established! Latency: {ping:.2f}ms")

            print("➜ Running schema migration & table auto-creation on Neon DB...")
            await conn.run_sync(Base.metadata.create_all)
            print("✔ All database tables verified and created successfully!")

        # Seed Super Admin User
        async with AsyncSessionLocal() as session:
            admin_email = "numan@leadpilot-ai.online"
            admin_pass = "Numannaeem12345!"
            admin_name = "Muhammad Numan"

            print(f"\n➜ Verifying Super Admin Account: {admin_email}")
            result = await session.execute(select(User).where(User.email == admin_email))
            existing_admin = result.scalars().first()

            if not existing_admin:
                new_admin = User(
                    id=str(uuid.uuid4()),
                    email=admin_email,
                    hashed_password=hash_password(admin_pass),
                    full_name=admin_name,
                    is_active=True,
                    is_superuser=True,
                    is_unlimited_credits=True,
                    ai_credits="UNLIMITED"
                )
                session.add(new_admin)
                await session.flush()

                # Default Organization
                org_name = "LeadPilot Global Enterprise"
                new_org = Organization(
                    id=str(uuid.uuid4()),
                    name=org_name,
                    slug="leadpilot-global-enterprise"
                )
                session.add(new_org)
                await session.flush()

                # Membership
                new_membership = Membership(
                    id=str(uuid.uuid4()),
                    user_id=new_admin.id,
                    organization_id=new_org.id,
                    role="owner"
                )
                session.add(new_membership)
                await session.commit()

                print(f"✔ CREATED Super Admin User: {admin_email}")
                print(f"✔ Role: Super Administrator (Unlimited AI Credits)")
                print(f"✔ Associated Organization: {org_name}")
            else:
                # Update credentials and privileges
                existing_admin.hashed_password = hash_password(admin_pass)
                existing_admin.full_name = admin_name
                existing_admin.is_active = True
                existing_admin.is_superuser = True
                existing_admin.is_unlimited_credits = True
                existing_admin.ai_credits = "UNLIMITED"
                await session.commit()
                print(f"✔ UPDATED Super Admin User: {admin_email} with fresh credentials & Superuser privileges!")

    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        return False

    print("=" * 65)
    print("🚀 Neon DB Live Database Sync & Super Admin Setup Complete!")
    print("=" * 65)
    return True

if __name__ == "__main__":
    asyncio.run(init_neon_database())
