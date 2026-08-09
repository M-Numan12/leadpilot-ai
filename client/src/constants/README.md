# 📁 constants — Application Constants

> **LeadPilot-AI | Frontend | Global Constants**

## Overview

`constants/` mein woh **fixed values** hain jo application mein kabhi change nahi hote. Jab koi value multiple jagahon par use hoti hai, use yahaan define karte hain taake ek jagah change karne par sab jagah update ho jaye.

---

## 📂 Directory Structure

```
constants/
└── index.ts    # All application constants
```

---

## 📦 File Details

### `index.ts`
**Purpose:** Central export of all application constants

**Common constants:**
```typescript
// =====================
// API Configuration
// =====================
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
export const API_TIMEOUT = 10000 // 10 seconds

// =====================
// Pagination
// =====================
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// =====================
// Lead Constants
// =====================
export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as const
export const LEAD_SCORE_MAX = 100
export const LEAD_SCORE_MIN = 0

export const LEAD_STATUS_LABELS = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal: 'Proposal Sent',
  won: 'Won',
  lost: 'Lost',
} as const

// =====================
// Campaign Constants
// =====================
export const CAMPAIGN_TYPES = ['email', 'sms', 'whatsapp'] as const
export const MAX_CAMPAIGN_NAME_LENGTH = 100

// =====================
// Date Formats
// =====================
export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm'
export const TIME_FORMAT = 'HH:mm'

// =====================
// UI Constants
// =====================
export const SIDEBAR_WIDTH = 260 // px
export const TOAST_DURATION = 3000 // 3 seconds
export const DEBOUNCE_DELAY = 300 // ms for search inputs
export const ANIMATION_DURATION = 200 // ms

// =====================
// Local Storage Keys
// =====================
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'leadpilot_token',
  USER: 'leadpilot_user',
  THEME: 'leadpilot_theme',
  SIDEBAR_STATE: 'leadpilot_sidebar',
} as const

// =====================
// Routes
// =====================
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  LEADS: '/dashboard/leads',
  CRM: '/dashboard/crm',
  CAMPAIGNS: '/dashboard/campaigns',
  ANALYTICS: '/dashboard/analytics',
  AI_AGENT: '/dashboard/ai-agent',
  SETTINGS: '/dashboard/settings',
  BILLING: '/dashboard/billing',
} as const
```

---

## 📤 Import Pattern

```typescript
import { ROUTES, LEAD_STATUS_LABELS, DEFAULT_PAGE_SIZE } from '@/constants'

// Usage
router.push(ROUTES.LEADS)
console.log(LEAD_STATUS_LABELS['won']) // "Won"
```

---

## 📋 Rules for Constants

1. **NO magic numbers** — never use raw numbers in code; always use a constant
2. **UPPER_SNAKE_CASE** — naming convention for all constants
3. **`as const`** — use for arrays/objects to get literal types
4. **Group related constants** — use comments to organize sections
5. **Environment variables** — wrap in constants with fallback values

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/types/` | Enums defined in types, labels defined here |
| `src/utils/` | Utility functions that use constants |
| `src/features/` | Feature logic imports constants |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
