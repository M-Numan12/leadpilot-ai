# 📁 components — Reusable UI Components

> **LeadPilot-AI | Frontend | Shared Components Library**

## Overview

`components/` mein woh saare **reusable React components** hain jo poori application mein use hote hain. Yeh components feature-based folders mein organize hain — har folder ek specific domain ka UI handle karta hai.

---

## 📂 Directory Structure

```
components/
├── agent/           # AI Agent related components
├── analytics/       # Charts, graphs, analytics widgets
├── campaigns/       # Campaign cards, forms, tables
├── common/          # Generic shared components (buttons, modals etc.)
├── companies/       # Company listing, detail components
├── conversations/   # Chat & conversation thread components
├── crm/             # CRM-specific UI components
├── dashboard/       # Dashboard widgets & overview cards
├── layout/          # Layout components (sidebar, header, etc.)
├── leads/           # Lead cards, pipeline, forms
├── navigation/      # Navbar, breadcrumbs, side navigation
├── proposals/       # Proposal editor & viewer components
└── ui/              # Base UI primitives (shadcn/ui or custom)
```

---

## 📦 Folder Details

### `agent/`
- AI Agent chat interface components
- Message bubbles, input box, agent status indicator
- Used in: `dashboard/ai-agent/` page

### `analytics/`
- Data visualization components
- Line charts, bar charts, pie charts, KPI cards
- Uses: recharts / chart.js library
- Used in: `dashboard/analytics/` page

### `campaigns/`
- Campaign creation form
- Campaign status cards
- Campaign performance table
- Used in: `dashboard/campaigns/` page

### `common/`
- **Shared generic components** used across all features
- Examples: `LoadingSpinner`, `EmptyState`, `ConfirmDialog`, `Badge`
- These have **no feature-specific logic**

### `companies/`
- Company profile cards
- Company list table
- Company detail view
- Used in: `dashboard/companies/` page

### `conversations/`
- Chat thread UI
- Message composer
- Conversation list sidebar
- Used in: `dashboard/conversations/` page

### `crm/`
- CRM pipeline board (Kanban)
- Deal cards
- Contact relationship view
- Used in: `dashboard/crm/` page

### `dashboard/`
- Overview stats cards
- Recent activity feed
- Quick action buttons
- Used in: `dashboard/overview/` page

### `layout/`
- `Sidebar` component
- `Header` / `TopBar` component
- `PageWrapper` / content containers
- Applied via `dashboard/layout.tsx`

### `leads/`
- Lead card component
- Lead pipeline (drag-drop board)
- Lead detail modal
- Lead import/export UI
- Used in: `dashboard/leads/` page

### `navigation/`
- Main navigation menu
- Breadcrumb component
- Active route indicator
- Mobile menu / hamburger

### `proposals/`
- Proposal editor (rich text)
- Proposal preview component
- Proposal status badge
- Used in: `dashboard/proposals/` page

### `ui/`
- **Base-level UI primitives**
- Button, Input, Select, Modal, Toast, Tooltip, etc.
- These are the **building blocks** — all other components use these

---

## 🧩 Component Design Rules

1. **One folder = one domain** — don't mix concerns
2. **`ui/` = dumb components** — no business logic, only presentation
3. **`common/` = shared logic** — used in 2+ features
4. Every component folder should have an `index.ts` for clean exports
5. **Props over state** — prefer controlled components

---

## 📤 Import Pattern

```typescript
// Feature-specific component
import { LeadCard } from '@/components/leads'

// UI primitive
import { Button } from '@/components/ui'

// Common shared
import { LoadingSpinner } from '@/components/common'

// Layout
import { Sidebar } from '@/components/layout'
```

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/features/` | Feature logic that powers these components |
| `src/app/dashboard/` | Pages that assemble these components |
| `src/types/` | TypeScript types used in component props |
| `src/hooks/` | Custom hooks used inside components |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
