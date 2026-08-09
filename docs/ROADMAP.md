# LeadPilot AI - 14-Phase Development Roadmap

> **Golden Rule for Development**: We will NOT build the entire project in a single monolithic pass. Every phase ends with a fully working, testable feature. We start from the foundation, progress through authentication/database, CRM, single AI agent, multi-agent graph, integrations, security, testing, and finally production deployment and scaling.

---

## 📌 Phase Overview & Status

| Phase | Description | Key Focus | Status |
| :--- | :--- | :--- | :---: |
| **Phase 1** | Foundation | Git, Client Next.js, Server FastAPI, Docker | ⏳ In Progress |
| **Phase 2** | Frontend Core | Design system, Layouts, Auth pages, Dashboard shell | 📋 Planned |
| **Phase 3** | Backend Core | FastAPI routes, PostgreSQL ORM, Migrations, Auth & RBAC | 📋 Planned |
| **Phase 4** | CRM Core | Leads, Companies, Contacts, Pipelines, Notes, Tasks | 📋 Planned |
| **Phase 5** | AI Foundation | OpenAI API, Structured outputs, Prompts, Tools, Logging | 📋 Planned |
| **Phase 6** | First Agent | Research Agent with search/website tools & Human Review | 📋 Planned |
| **Phase 7** | Multi-Agent System | Manager, Planner, Analyzer, Qualifier, Proposal, CRM Agents | 📋 Planned |
| **Phase 8** | Integrations | OAuth 2.0, API clients (Email, Calendar, CRM, Slack) | 📋 Planned |
| **Phase 9** | Background Processing | Redis, Celery workers, Retries, Scheduled Jobs | 📋 Planned |
| **Phase 10** | RAG & Memory | Portfolio, Case Studies, Custom Knowledge Base | 📋 Planned |
| **Phase 11** | Analytics | Funnel metrics, Campaign stats, Agent latency/cost | 📋 Planned |
| **Phase 12** | Security & Testing | Unit/Integration/E2E tests, Audit Logs, AI Eval | 📋 Planned |
| **Phase 13** | Deployment | Docker, CI/CD, Production DB, HTTPS, Backups | 📋 Planned |
| **Phase 14** | Scaling | Caching, Worker scaling, Observability & Boundaries | 📋 Planned |

---

## 🛠️ Detailed Milestone Breakdown

### Phase 1 — Foundation (Current)
- Establish monorepo structure: `client/`, `server/`, `database/`, `infrastructure/`, `docs/`, `scripts/`, `.github/`.
- Configure Next.js 14 (App Router, TS, Tailwind CSS) & FastAPI (Python 3.11+).
- Set up Docker Compose for `client`, `server`, `postgres`, and `redis`.

### Phase 2 — Frontend Core
- Build cohesive modern UI design system (glassmorphism, dark/light themes, typography).
- Build marketing pages (`/`, `/pricing`, `/features`, `/contact`).
- Build auth pages (`/login`, `/register`, `/forgot-password`, `/verify-email`).
- Build responsive dashboard sidebar, header, and shell layout.

### Phase 3 — Backend Core
- Set up SQLAlchemy 2.0 + AsyncPG database connection handlers.
- Create initial migrations for `users`, `organizations`, and `memberships`.
- Implement JWT authentication, password hashing, and RBAC authorization middlewares.

### Phase 4 — CRM Core
- Implement CRUD APIs and UI views for Leads, Companies, and Contacts.
- Build deal pipeline board (drag & drop deal stages), task manager, and notes system.

### Phase 5 — AI Foundation
- Set up OpenAI SDK integration with structured outputs (Pydantic models).
- Create centralized prompt registry (`app/ai/prompts/`) and tool interfaces (`app/ai/tools/`).

### Phase 6 — First Agent (Research Agent)
- Build initial Research Agent capable of querying search engines and scraping public business websites.
- Implement Human Review gate for research output validation.

### Phase 7 — Multi-Agent System (LangGraph)
- Implement `ManagerAgent` router and `PlannerAgent` state graph.
- Add `CompanyAnalyzer`, `LeadQualifier`, `ProposalWriter`, `OutreachAgent`, `FollowupAgent`, and `CRMAgent`.
- Add mandatory Human Approval step between Proposal generation and Outreach execution.

### Phase 8 — Integrations Layer
- OAuth 2.0 flow for Google / Gmail / Google Calendar.
- Scoped token encryption and storage (`app/security/authentication.py`).
- Implement integration adapters for messaging platforms and CRMs.

### Phase 9 — Background Workers
- Integrate Redis as broker and Celery as background task worker engine.
- Offload long-running company research, email sending, and follow-up reminders to worker queues.

### Phase 10 — RAG & Knowledge Memory
- Initialize `pgvector` extension in PostgreSQL.
- Build embedding pipeline for user portfolio, case studies, and ideal client profiles (ICP).
- Implement vector search retrieval for grounded proposal generation.

### Phase 11 — Business Intelligence & Analytics
- Track lead conversion funnel metrics (Discovered -> Qualified -> Proposed -> Converted).
- Build performance dashboards showing campaign response rates, agent costs, and latencies.

### Phase 12 — Security & Testing
- Write unit, integration, and E2E test suites.
- Implement security audit logging (`audit_logs` table) and API rate-limiting middleware.

### Phase 13 — Production Deployment
- Configure production Docker containers, SSL/TLS reverse proxy (Nginx), and GitHub Actions CI/CD workflows.
- Set up automated PostgreSQL backups and health check monitors.

### Phase 14 — Scaling & Optimization
- Implement multi-level Redis caching, database index tuning, and worker replica scaling.
