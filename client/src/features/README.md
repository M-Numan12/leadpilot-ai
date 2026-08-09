# 📁 features — Business Logic & Feature Modules

> **LeadPilot-AI | Frontend | Feature-Based Architecture**

## Overview

`features/` mein application ka **core business logic** hota hai. Yahan har feature ka apna folder hota hai jisme us feature ki:
- API calls (queries/mutations)
- State management
- Custom hooks
- Type definitions
- Helper functions

...sab organize hotay hain. Yeh pattern **"Feature-Sliced Design"** kehlata hai.

---

## 📂 Directory Structure

```
features/
├── agent/        # AI Agent feature logic
├── auth/         # Authentication feature logic
├── billing/      # Billing & subscription logic
├── campaigns/    # Campaign management logic
├── crm/          # CRM (Customer Relationship Management) logic
└── leads/        # Leads management logic
```

---

## 📦 Folder Details

### `agent/`
**AI Agent feature**
- API calls to the AI agent backend
- Agent conversation state
- Message handling logic
- Agent configuration utilities
- `index.ts` — exports all agent-related hooks & utils

### `auth/`
**Authentication feature**
- Login, Register, Logout API calls
- Session/token management
- Auth state (user info, permissions)
- Password reset flow
- `index.ts` — exports auth hooks (useAuth, useLogin, useRegister)

### `billing/`
**Billing & Subscription feature**
- Stripe integration logic
- Subscription plan management
- Invoice fetching
- Payment method management
- `index.ts` — exports billing hooks & services

### `campaigns/`
**Campaign Management feature**
- Campaign CRUD API calls
- Campaign analytics data fetching
- Campaign status management
- Email/SMS campaign logic
- `index.ts` — exports campaign hooks

### `crm/`
**CRM feature**
- Contact management API
- Deal pipeline logic
- Company/Organization management
- CRM data transformations
- `index.ts` — exports CRM hooks & utilities

### `leads/`
**Leads Management feature**
- Lead capture & creation API
- Lead scoring logic
- Lead pipeline state
- Lead import/export functionality
- Lead assignment logic
- `index.ts` — exports leads hooks

---

## 🏗 Feature Module Structure

Each feature folder follows this structure:

```
features/leads/
├── index.ts              # Main export file
├── leads.api.ts          # API calls (fetch, create, update, delete)
├── leads.hooks.ts        # Custom React hooks
├── leads.store.ts        # Zustand/Redux slice (if needed)
├── leads.types.ts        # TypeScript interfaces & types
└── leads.utils.ts        # Helper/utility functions
```

---

## 🔄 Data Flow

```
Page (app/dashboard/leads/)
    ↓ uses
Feature Hook (features/leads/useLeads)
    ↓ calls
API Service (services/api.ts)
    ↓ hits
Backend Server (server/)
```

---

## 📤 Import Pattern

```typescript
// In a component or page:
import { useLeads, createLead } from '@/features/leads'
import { useAuth, useCurrentUser } from '@/features/auth'
import { useCampaigns } from '@/features/campaigns'
```

---

## 📋 Rules for Features

1. **Features are self-contained** — no cross-feature imports (use `services/` for shared API)
2. **`index.ts` is the only public interface** — never import from internal files directly
3. **No UI code here** — UI goes in `components/`, logic goes in `features/`
4. **API calls only through `services/api.ts`** — no direct fetch calls in features

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/components/` | UI components that use feature hooks |
| `src/services/` | Shared API client (axios instance) |
| `src/store/` | Global state (shared across features) |
| `src/types/` | Shared TypeScript types |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
