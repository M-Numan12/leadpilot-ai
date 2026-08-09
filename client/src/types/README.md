# 📁 types — TypeScript Type Definitions

> **LeadPilot-AI | Frontend | Global TypeScript Types**

## Overview

`types/` mein poori application mein use honay wali **shared TypeScript type definitions, interfaces aur enums** hoti hain. Yeh types multiple features ya components mein reuse hoti hain. Feature-specific types apni feature folder mein rakhte hain.

---

## 📂 Directory Structure

```
types/
└── index.ts    # All shared type exports
```

---

## 📦 File Details

### `index.ts`
**Purpose:** Centralized export of all global TypeScript types

**Common types include:**

```typescript
// =====================
// User & Auth Types
// =====================
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: string
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  AGENT = 'agent',
  VIEWER = 'viewer',
}

// =====================
// Lead Types
// =====================
export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: LeadStatus
  score: number
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  WON = 'won',
  LOST = 'lost',
}

// =====================
// Campaign Types
// =====================
export interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  targetAudience: string
  sentCount: number
  openRate: number
  clickRate: number
}

export enum CampaignType {
  EMAIL = 'email',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
}

// =====================
// API Response Types
// =====================
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  pagination?: Pagination
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// =====================
// UI Common Types
// =====================
export type Size = 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
export type Status = 'active' | 'inactive' | 'pending' | 'archived'
```

---

## 📤 Import Pattern

```typescript
// Import types anywhere in the project
import type { User, Lead, Campaign, ApiResponse } from '@/types'
import { UserRole, LeadStatus } from '@/types'
```

---

## 📋 Rules for Types

1. **Shared types only** — feature-specific types stay in `features/<name>/`
2. **`interface` for objects** — use `interface` not `type` for object shapes
3. **`enum` for fixed values** — status fields, roles, categories
4. **`type` for unions** — `type Size = 'sm' | 'md' | 'lg'`
5. **All exports from `index.ts`** — no direct file imports

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/schemas/` | Zod validation schemas (runtime type checking) |
| `src/features/` | Feature-specific types live here |
| `src/components/` | Uses these types for component props |
| `src/store/` | Store state uses these types |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
