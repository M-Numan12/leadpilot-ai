#!/usr/bin/env python3
"""
Neon DB Serverless PostgreSQL Automatic Initialization & Health Script
"""

import sys
import os
import asyncio
import time

# Ensure UTF-8 output encoding on Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

# Add server directory to python path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "server"))

from sqlalchemy import text
from app.database.connection import engine
from app.models.base import Base

# Import all models to ensure metadata registration
import app.models  # noqa: F401

async def init_neon_database():
    print("=" * 60)
    print("⚡ LeadPilot AI - Neon DB PostgreSQL Automated Setup")
    print("=" * 60)

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

    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        return False

    print("=" * 60)
    print("🚀 Neon DB Live Database Sync Complete!")
    print("=" * 60)
    return True

if __name__ == "__main__":
    asyncio.run(init_neon_database())
