# LeadPilot AI - System Architecture Documentation

## Overview
LeadPilot AI is built as a multi-tier, modular platform designed for autonomous sales workflows with human oversight.

```text
+-------------------------------------------------------+
|                    Client (Next.js)                   |
|       App Router | React | TypeScript | Tailwind      |
+---------------------------+---------------------------+
                            | HTTPS / REST / WebSockets
                            v
+-------------------------------------------------------+
|                    Server (FastAPI)                   |
|        Routers | Services | Security | Workers        |
+-------------+---------------------------+-------------+
              |                           |
              v                           v
+---------------------------+   +-----------------------+
|   LangGraph Agent Engine  |   |   Database & Cache    |
| Manager -> Planner ->     |   | PostgreSQL + pgvector |
| Specialized Agents        |   | Redis Broker / Cache  |
+---------------------------+   +-----------------------+
```

## Core Subsystems

### 1. Client (`/client`)
- Built with **Next.js 14** (App Router) and TypeScript.
- Handles UI rendering, user dashboard, lead interaction, proposal review, and settings.

### 2. Server (`/server`)
- Built with **Python FastAPI**.
- Exposes RESTful API endpoints under `/api/v1/`.
- Manages authentication, OAuth tokens, background workers, and LangGraph agent execution.

### 3. Agent Orchestration (`/server/app/agents/`)
- Powered by **LangGraph**.
- **Manager Agent**: Central router deciding task allocation.
- **Planner Agent**: Generates execution plans.
- **Human Approval Gate**: Intercepts proposal and outreach steps for user verification.

### 4. Persistence & Search (`/database` & PostgreSQL)
- **PostgreSQL**: Stores relational data (Users, Leads, Companies, Campaigns, Proposals).
- **`pgvector`**: Stores vector embeddings for semantic document search and lead matching.
- **Redis**: Serves as state cache and background task queue for Celery.
