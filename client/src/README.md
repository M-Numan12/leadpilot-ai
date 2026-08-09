# 📁 src — LeadPilot-AI Frontend Source

> **LeadPilot-AI | Frontend | Next.js 14 | TypeScript**

## Overview

Yeh **LeadPilot-AI** ka frontend source directory hai — ek AI-powered Lead Management aur CRM platform. Built with **Next.js 14 App Router** aur **TypeScript**.

---

## 🗺 Complete Directory Map

```
src/
│
├── 📁 app/                 → Next.js App Router — All Pages & Routes
│   ├── (auth)/             → Authentication pages (login, register, etc.)
│   ├── (marketing)/        → Landing & marketing pages
│   ├── admin/              → Admin panel
│   ├── api/                → Server-side API route handlers
│   └── dashboard/          → Main app with 16 feature modules
│
├── 📁 components/          → Reusable UI Components (feature-organized)
│   ├── agent/              → AI Agent chat components
│   ├── analytics/          → Charts & analytics widgets
│   ├── campaigns/          → Campaign UI components
│   ├── common/             → Shared generic components
│   ├── companies/          → Company components
│   ├── conversations/      → Chat & messaging components
│   ├── crm/                → CRM pipeline components
│   ├── dashboard/          → Dashboard widgets
│   ├── layout/             → Sidebar, Header, layout wrappers
│   ├── leads/              → Lead cards, pipeline components
│   ├── navigation/         → Nav, breadcrumbs
│   ├── proposals/          → Proposal editor/viewer
│   └── ui/                 → Base UI primitives (Button, Input, etc.)
│
├── 📁 features/            → Business Logic & Feature Modules
│   ├── agent/              → AI Agent feature logic
│   ├── auth/               → Authentication logic
│   ├── billing/            → Billing & subscription logic
│   ├── campaigns/          → Campaign management logic
│   ├── crm/                → CRM logic
│   └── leads/              → Leads management logic
│
├── 📁 hooks/               → Global Custom React Hooks
│   └── useAgent.ts         → AI Agent hook
│
├── 📁 services/            → API Client / HTTP Configuration
│   └── api.ts              → Axios instance with interceptors
│
├── 📁 store/               → Global State Management (Zustand)
│   └── index.ts            → Store configuration & exports
│
├── 📁 lib/                 → Library Configurations & Low-level Utils
│   └── utils.ts            → cn() class merger + utilities
│
├── 📁 types/               → Global TypeScript Type Definitions
│   └── index.ts            → All shared interfaces, types, enums
│
├── 📁 context/             → React Context Providers
│   └── AuthContext.tsx     → Authentication context
│
├── 📁 schemas/             → Zod Validation Schemas
│   └── lead.schema.ts      → Lead form validation
│
├── 📁 constants/           → Application Constants
│   └── index.ts            → Routes, config, labels, keys
│
├── 📁 providers/           → App-level React Providers
│   └── AppProvider.tsx     → Root provider tree
│
├── 📁 styles/              → Global CSS Styles
│   └── globals.css         → CSS variables, resets, typography
│
└── 📁 utils/               → App-Specific Helper Functions
    └── formatters.ts       → Date, number, string formatters
```

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────┐
│              PAGES (app/)               │
│  Route files that assemble components   │
└──────────────┬──────────────────────────┘
               │ uses
┌──────────────▼──────────────────────────┐
│           COMPONENTS (components/)      │
│   UI components organized by feature   │
└──────────────┬──────────────────────────┘
               │ powered by
┌──────────────▼──────────────────────────┐
│            FEATURES (features/)         │
│   Business logic, hooks, API calls      │
└──────────────┬──────────────────────────┘
               │ calls
┌──────────────▼──────────────────────────┐
│            SERVICES (services/)         │
│       Configured HTTP API client        │
└──────────────┬──────────────────────────┘
               │ hits
┌──────────────▼──────────────────────────┐
│          BACKEND SERVER (server/)       │
│    FastAPI / Python backend             │
└─────────────────────────────────────────┘
```

---

## 📋 Quick Reference — "Kahan Kya Jata Hai?"

| Cheez | Kahan Rakhein |
|-------|---------------|
| Naya page banana | `app/dashboard/<feature>/page.tsx` |
| Naya UI component | `components/<feature>/` |
| API call banana | `features/<feature>/<feature>.api.ts` |
| Custom hook | `features/<feature>/` ya `hooks/` (agar global) |
| TypeScript type | `types/index.ts` (agar shared) |
| Form validation | `schemas/<name>.schema.ts` |
| Helper function | `utils/formatters.ts` |
| Fixed value / config | `constants/index.ts` |
| Global state | `store/index.ts` |
| Context provider | `context/` |
| CSS variable | `styles/globals.css` |

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety |
| **TanStack Query** | Server state & data fetching |
| **Zustand** | Client-side global state |
| **Zod** | Runtime schema validation |
| **Axios** | HTTP client |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | UI component library |
| **React Hook Form** | Form management |

---

## 📚 Folder Documentation

| Folder | README |
|--------|--------|
| `app/` | [README.md](./app/README.md) |
| `components/` | [README.md](./components/README.md) |
| `features/` | [README.md](./features/README.md) |
| `hooks/` | [README.md](./hooks/README.md) |
| `services/` | [README.md](./services/README.md) |
| `store/` | [README.md](./store/README.md) |
| `lib/` | [README.md](./lib/README.md) |
| `types/` | [README.md](./types/README.md) |
| `context/` | [README.md](./context/README.md) |
| `schemas/` | [README.md](./schemas/README.md) |
| `constants/` | [README.md](./constants/README.md) |
| `providers/` | [README.md](./providers/README.md) |
| `styles/` | [README.md](./styles/README.md) |
| `utils/` | [README.md](./utils/README.md) |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
