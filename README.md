# LeadPilot AI — Client Acquisition Operating System

**LeadPilot AI** is an advanced AI-powered client acquisition and sales automation platform designed to help freelancers, agencies, startups, and businesses discover potential clients, research companies, qualify leads, generate personalized proposals, manage conversations, and organize follow-ups from one intelligent workspace.

---

## 🎯 1. Project Aim

LeadPilot AI ka main aim ek **intelligent client-acquisition platform** banana hai jo business/freelancer ki services ko samajh kar:
* Relevant prospects ko **discover**, **research**, **qualify** aur **organize** kare;
* **Personalized proposals** aur outreach drafts tayar kare;
* **Follow-ups** aur **CRM** ko manage kare;
* Approved actions ko **secure integrations** ke zariye execute karne mein madad kare.

---

## 🔄 2. End-to-End Workflow

```text
User Profile ➔ Lead Discovery ➔ Company Research ➔ Contact Research ➔ Lead Qualification ➔ Opportunity Analysis ➔ Proposal/Message ➔ Human Approval ➔ Permitted Outreach ➔ Conversation ➔ Follow-up ➔ CRM ➔ Analytics
```

---

## 📁 3. Root Project Structure

```text
leadpilot-ai/
├── client/                 # User-facing Next.js web application
├── server/                 # Python FastAPI, business logic, AI orchestration & workers
├── database/               # SQL schemas, migrations, seed data & backups
├── infrastructure/         # Docker, reverse proxy (Nginx), Redis, PostgreSQL
├── docs/                   # Architecture, API, agents, database & deployment docs
├── scripts/                # Setup, migration, seed & deployment utilities
└── .github/workflows/      # CI/CD automation pipelines
```

---

## 🎨 4. Frontend Architecture (`client/`)

| Directory | Purpose | Kaam | Input | Output |
| :--- | :--- | :--- | :--- | :--- |
| `public/` | Static Assets | Images, logos, icons, fonts, animations serve karta hai | Static files | Browser-ready assets |
| `src/app/` | Routes & Pages | Marketing, Auth, Dashboard, Admin aur API routes organize karta hai | User URL/request | Rendered page components |
| `src/components/` | Reusable UI | Buttons, tables, cards, modals, sidebar, navbar, charts provide karta hai | Props / State | Reusable UI elements |
| `src/features/` | Feature Modules | Leads, campaigns, CRM, agent, billing features ko isolate rakhta hai | Domain logic | Feature UI + logic |
| `src/hooks/` | Custom React Logic | Auth, user, chat, lead aur API repeated behaviors manage karta hai | State / Events | Reusable custom hooks |
| `src/services/` | API Client Layer | Backend endpoints call karne ke functions provide karta hai | API Requests | Typed API Responses |
| `src/lib/` | Library Config | Axios/fetch, auth, Supabase ya SDK clients ki config | Env / Config | Configured SDK clients |
| `src/store/` | Global State | User, chat, leads, settings cross-page state manage karta hai | Actions / Data | Shared application state |
| `src/providers/` | Global Providers | Theme, query/cache, auth & session context initialize karta hai | App Config | Global Context Providers |
| `src/context/` | React Contexts | Global data ko component trees tak share karta hai | Context values | Shared context values |
| `src/types/` | Type Definitions | Frontend entities & API TypeScript types define karta hai | Data Models | Compile-time type safety |
| `src/schemas/` | Input Validation | Forms aur API inputs validate (Zod) karta hai | User Input | Valid / Invalid result |
| `src/utils/` | Helper Functions | Dates, currency, formatting, validation, export handle karta hai | Raw Values | Formatted / Processed data |
| `src/constants/` | App Configurations | Routes, roles, permissions & navigation constants | System Rules | Shared Constants |
| `src/styles/` | Visual Styling | Global CSS, theme variables, Tailwind rules define karta hai | Design Tokens | Styled Application |

---

## 🖥️ 5. Frontend Pages — User View

* 🌐 **Marketing**: Product explanation, features, pricing, and contact page.
* 🔐 **Login/Register**: Account creation, authentication, and email verification.
* 📊 **Dashboard Overview**: Summary of leads, active campaigns, response rates, meetings, and key KPIs.
* 🤖 **AI Agent Hub**: Give tasks to AI agents, monitor real-time run status, and approve pending actions.
* 🔎 **Leads**: Complete lead list, filters, ICP score, lead source, status, and recommended next action.
* 🏢 **Companies**: Company profiles, AI research summaries, website findings, and identified pain points.
* 📇 **Contacts**: Public business contacts, key decision-makers, and interaction history.
* 📧 **Campaigns**: Approved outreach campaigns and real-time performance tracking.
* 💬 **Conversations**: Client conversations, AI reply suggestions, and notes.
* ✍️ **Proposals**: AI-generated proposals, draft editor, approval controls, and status tracking.
* 📈 **CRM Workspace**: Lead/deal pipeline board and relationship management.
* 📅 **Tasks / Calendar**: Scheduled follow-ups, automated reminders, and calendar meetings.
* 📉 **Analytics**: Lead funnel, response rate, conversion metrics, and agent performance.
* 🔌 **Integrations**: Connected services, OAuth authorizations, and permission scopes.
* 💳 **Billing**: Subscription tier, usage quotas, and billing management.
* ⚙️ **Settings / Team**: User profile, organization settings, team roles, and preferences.
* 🛠️ **Admin Hub**: System users, agent execution logs, background jobs, and operational controls.

---

## ⚡ 6. Backend Architecture (`server/`)

| Module | Purpose | Kaam | Input | Output |
| :--- | :--- | :--- | :--- | :--- |
| `app/main.py` | Backend Entry Point | FastAPI initialize, middleware, routers, startup/shutdown config | System Config | Running API server |
| `app/api/v1/` | Public API Layer | Auth, users, leads, companies, campaigns, proposals endpoints expose | HTTP Requests | Validated JSON Responses |
| `app/api/dependencies.py` | Request Dependencies | Current user, org, database session & permission checks | HTTP Headers / Session | Injected dependencies |
| `app/agents/` | AI Agent Layer | Manager, planner, researcher, analyzer, qualifier, proposal agents | Task + Tools + Context | Agent Decisions & Actions |
| `app/ai/` | AI Infrastructure | OpenAI providers, prompts, tool calling, memory, RAG, guardrails | Agent Context | Structured AI Output |
| `app/tools/` | Controlled Agent Tools | Search, browser, website scraper, email, calendar, CRM tools | Agent Requests | Tool Execution Results |
| `app/integrations/` | External Integrations | Google/Gmail, Calendar, Slack, CRM adapters manage karta hai | OAuth / Token Request | External Service Response |
| `app/models/` | SQLAlchemy Models | User, org, lead, company, contact, campaign, proposal ORM models | App Data | ORM Objects |
| `app/schemas/` | Pydantic Schemas | Request & response data schemas validate karta hai | JSON Payload | Validated Schemas |
| `app/services/` | Business Logic Layer | Core business workflows ko routes se separate rakhta hai | Domain Data | Business Operation Result |
| `app/repositories/` | Data Access Layer | Database queries aur persistence logic centralize karta hai | Entity Queries | Database Query Results |
| `app/database/` | Database Layer | PostgreSQL connection, async sessions, migrations manage | DB Config | Async DB Access |
| `app/workers/` | Background Jobs | Long-running research, lead processing, email jobs handle | Queued Jobs | Job Status / Output |
| `app/security/` | Security Controls | Auth, RBAC authorization, token encryption, rate limiting | Credentials / Request | Access Decision |
| `app/core/` | Core Utilities | Settings, structured logging, exception handlers, telemetry | Config / Events | Backend Infrastructure |

---

## 🤖 7. AI Agents — Responsibilities

```text
Manager Agent (Task Router)
      │
      ▼
Planner Agent (Workflow Graph)
      │
      ├──► Research Agent (Lead Discovery)
      ├──► Company Analyzer (Business & Website Scraper)
      ├──► Lead Qualifier (ICP Scoring)
      ├──► Proposal Writer (Custom Pitch Generation)
      │       │
      │       ▼
      │   🔐 [ Human Approval Gate ]
      │       │
      ├──► Outreach Agent (Campaign Dispatch)
      ├──► Follow-up Agent (Reminders & Re-engagement)
      └──► CRM Agent (Pipeline Sync)
```

* 👑 **Manager Agent**: Task ko samajh kar decide karta hai ke kaun se agents aur tools kis order mein chalenge.
* 📋 **Planner Agent**: Complex goals ko sub-tasks aur execution steps mein divide karta hai.
* 🔎 **Research Agent**: Permitted public sources se target businesses aur prospects research karta hai.
* 🏢 **Company Analyzer**: Prospect websites aur public business data analyze karke needs identify karta hai.
* 🧠 **Lead Qualifier**: Leads ko Ideal Client Profile (ICP) criteria ke mutabiq score karta hai.
* ✍️ **Proposal Writer**: Prospect research ke basis par personalized proposal drafts tayar karta hai.
* 📧 **Outreach Agent**: Approved proposals ke liye channel-specific outreach messages prepare karta hai.
* 🔄 **Follow-up Agent**: Interaction status ke basis par next follow-up action schedule karta hai.
* 📊 **CRM Agent**: Lead, contact, aur deal status ko database/CRM mein sync rakhta hai.
* 🧠 **Memory / RAG Layer**: User ki services, portfolio, aur past approved messages retrieve karta hai.

---

## 🗄️ 8. Core Database Entities

1. **`users`**: Individual user accounts.
2. **`organizations`**: Workspace and business ownership records.
3. **`memberships`**: User roles and permissions within organizations.
4. **`leads`**: Prospect records, ICP score, lead source, and status.
5. **`companies`**: Business profiles, website findings, and research data.
6. **`contacts`**: Business contacts and professional details.
7. **`campaigns`**: Outreach campaign configurations and metrics.
8. **`messages / conversations`**: Communication history, drafts, and replies.
9. **`proposals`**: AI-generated proposals, versions, and approval states.
10. **`tasks`**: Scheduled follow-ups, reminders, and user actions.
11. **`agent_runs`**: Agent execution logs, input/output summaries, cost, and latency metadata.
12. **`integrations`**: Connected third-party service tokens and permissions.
13. **`audit_logs`**: Security-sensitive actions and approval trail.

---

## 🔐 9. Security Rules

1. 🛑 **Zero Password Sharing**: User passwords are **NEVER** provided to AI agents.
2. 🔑 **OAuth & Encrypted Tokens**: All third-party integrations use OAuth 2.0 or encrypted access tokens with least-privilege scoping.
3. 🔒 **Secrets Security**: All secrets reside in `.env` or secret managers — never committed to Git.
4. ✋ **Human Approval**: High-impact actions (sending emails, initiating outreach) require explicit user approval.
5. 🛡️ **Rate Limiting & RBAC**: Enforced at the API layer for all endpoints.
6. 📜 **TOS & Permitted APIs**: Full compliance with platform Terms of Service and official APIs.

---

## 🏗️ 10. Development Order (14 Phases)

For full roadmap breakdown, see [docs/ROADMAP.md](file:///d:/leadpilot-ai/docs/ROADMAP.md).

* **Phase 1**: Foundation (Repository structure, Next.js client, FastAPI server, Docker setup)
* **Phase 2**: Frontend Core (Design system, authentication pages, dashboard shell)
* **Phase 3**: Backend Core (FastAPI setup, PostgreSQL connection, migrations, auth, RBAC)
* **Phase 4**: CRM Core (Leads, companies, contacts, statuses, tasks, deal pipeline)
* **Phase 5**: AI Foundation (OpenAI API integration, structured outputs, prompt registry)
* **Phase 6**: First Agent (Research Agent with web tools and human-review workflow)
* **Phase 7**: Multi-Agent System (Manager, planner, analyzer, qualifier, proposal, CRM agents)
* **Phase 8**: Integrations (OAuth 2.0, Gmail, Calendar, Slack adapters)
* **Phase 9**: Background Processing (Redis, Celery workers, job queues, retries)
* **Phase 10**: RAG & Memory (Vector database, portfolio embeddings, grounded proposals)
* **Phase 11**: Analytics (Funnel metrics, campaign tracking, agent performance)
* **Phase 12**: Security & Testing (Unit/integration/E2E tests, audit logs, AI eval)
* **Phase 13**: Deployment (Docker production, CI/CD, HTTPS, backups, monitoring)
* **Phase 14**: Scaling (Worker replicas, Redis caching, performance tuning)

---

## 🌟 11. Golden Rule for Development

> **Hum project ko ek hi baar mein build nahi karenge.** Every phase concludes with a fully functional, testable feature. First foundation, then authentication/database, then CRM, then single AI agent, then multi-agent graph, and finally integrations, security, testing, and production deployment.
