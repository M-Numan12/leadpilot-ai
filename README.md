# LeadPilot AI

**LeadPilot AI** is an advanced AI-powered client acquisition and sales automation platform designed to help freelancers, agencies, startups, and businesses discover potential clients, research companies, qualify leads, generate personalized proposals, manage conversations, and organize follow-ups from one intelligent workspace.

---

## 🏗️ System Actual Flow

```text
                    USER
                     │
                     ▼
              ┌─────────────┐
              │   CLIENT    │
              │ Next.js/TS  │
              └──────┬──────┘
                     │
                  HTTPS/API
                     │
                     ▼
              ┌─────────────┐
              │   SERVER    │
              │   FastAPI   │
              └──────┬──────┘
                     │
             ┌───────┴────────┐
             ▼                ▼
        AI AGENTS          SERVICES
             │                │
     ┌───────┼────────┐       │
     ▼       ▼        ▼       ▼
 Research  Analysis  Sales   CRM
     │       │        │       │
     └───────┴────────┴───────┘
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       PostgreSQL   Redis    Vector DB
      (with pgvector)           │
          │          │          │
          └──────────┼──────────┘
                     ▼
              External APIs
```

---

## 🤖 AI Agent Layer & Orchestration

LeadPilot AI employs a **LangGraph-powered Multi-Agent System** coordinated by a central Manager Agent:

```text
Manager Agent
      │
      ▼
Planner Agent
      │
      ├──► Research Agent
      │
      ├──► Company Analyzer
      │
      ├──► Lead Qualifier
      │
      ├──► Proposal Agent
      │       │
      │       ▼
      │   [ Human Approval Gate ]
      │       │
      ├──► Outreach Agent
      │
      ├──► Follow-up Agent
      │
      └──► CRM Agent
```

### Agent Responsibilities:
* 👑 **Manager Agent**: Evaluates incoming user requests and dynamically routes tasks to the appropriate specialized agents.
* 📋 **Planner Agent**: Decomposes complex multi-step goals into sequential execution graphs.
* 🔎 **Research Agent**: Discovers potential targets and leads across permitted business directories and APIs.
* 🏢 **Company Analyzer**: Analyzes prospect websites, tech stacks, business services, and pain points.
* 🧠 **Lead Qualifier**: Scores leads based on Ideal Client Profile (ICP) criteria.
* ✍️ **Proposal Agent**: Generates custom tailored sales proposals and pitch drafts based on company research.
* 📧 **Outreach Agent**: Prepares and sends approved outreach campaigns via official APIs.
* 🔄 **Follow-up Agent**: Monitors client interactions and schedules timely follow-ups.
* 📊 **CRM Agent**: Maintains deal stages, contacts, tasks, and syncs pipeline metrics.

---

## 💡 Example Execution Flow

**User Goal**: *"USA mein 20 potential web-development companies find karo."*

```text
User Request
     │
     ▼
Manager Agent (Determines plan & assigns tasks)
     │
     ▼
Research Agent (Finds target companies in USA)
     │
     ▼
Company Analyzer (Scrapes/analyzes websites & business services)
     │
     ▼
Lead Qualifier (Filters and scores top relevant leads)
     │
     ▼
Proposal Agent (Drafts personalized proposals for top leads)
     │
     ▼
🔐 [ Human Approval Gate ] (User reviews & approves proposals)
     │
     ▼
Outreach Agent (Executes email/messaging outreach)
     │
     ▼
CRM Agent (Updates deal status & schedules follow-up)
```

---

## 🔐 Security & Permission Philosophy

LeadPilot AI is engineered around strict zero-trust security and compliance principles:

* 🛡️ **Zero Raw Password Sharing**: AI Agents **NEVER** receive raw user passwords or credentials. Authentication relies strictly on OAuth 2.0, encrypted tokens, and scoped API keys.
* 🔒 **Least-Privilege Scoping**: Agents are granted only the precise API permissions necessary to fulfill their immediate task.
* 🛑 **Human-in-the-Loop Approval**: High-impact actions (such as sending proposals or initiating outreach messages) require explicit human review and approval before execution.
* 📜 **Permitted Workflows & Compliance**: Integrations with platforms like LinkedIn, Upwork, Fiverr, and Meta prioritize official APIs, permitted workflows, and user safety over unauthorized scraping or spamming.

---

## 🛠️ Recommended Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend (Client)** | Next.js (App Router) + TypeScript |
| **UI Design** | Tailwind CSS + Lucide Icons + Framer Motion |
| **Backend (Server)** | Python 3.11+ + FastAPI |
| **AI Models** | OpenAI API (GPT-4o / Embeddings) |
| **Agent Orchestration** | LangGraph + LangChain |
| **Primary Database** | PostgreSQL |
| **Vector Storage** | `pgvector` extension |
| **Cache & Message Broker** | Redis |
| **Background Tasks** | Celery / Worker Processors |
| **Browser Tooling** | Playwright |
| **Workflow Automation** | n8n |
| **Authentication** | OAuth 2.0 + Secure Sessions / JWT |
| **Containerization** | Docker & Docker Compose |
| **CI / CD** | GitHub Actions |
| **Observability** | OpenTelemetry + Structured Logging |
| **Deployment** | Cloud / VPS (Docker Compose / Kubernetes) |

---

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.11+

### Quick Start
```bash
# Clone the repository
git clone https://github.com/M-Numan12/leadpilot-ai.git
cd leadpilot-ai

# Start full application with Docker Compose
docker-compose up -d --build
```

- **Client App**: [http://localhost:3000](http://localhost:3000)
- **Server API**: [http://localhost:8000/api/v1](http://localhost:8000/api/v1)
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
