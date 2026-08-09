# 📁 lib — Library Utilities & Configurations

> **LeadPilot-AI | Frontend | Library Config & Utilities**

## Overview

`lib/` mein **third-party library configurations** aur **low-level utility functions** hote hain. Yeh `utils/` se alag hai — `utils/` mein app-specific helpers hain jabke `lib/` mein external library wrappers aur configurations hain.

---

## 📂 Directory Structure

```
lib/
└── utils.ts    # Core utility functions & class name helpers
```

---

## 📦 File Details

### `utils.ts`
**Purpose:** Core utility functions — especially class name merging for Tailwind/CSS

Typically contains the `cn()` helper function (standard in Next.js + shadcn/ui projects):

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// CSS class name merger — combines clsx + tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
```typescript
import { cn } from '@/lib/utils'

// Conditional class names
<div className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'
)} />
```

---

## 🔧 What Else Can Go in `lib/`?

As the project grows, more configs can be added:

```
lib/
├── utils.ts          # cn() helper + misc utilities
├── auth.ts           # NextAuth / auth helper config
├── db.ts             # Database client config (if used on server)
├── stripe.ts         # Stripe client initialization
├── analytics.ts      # Analytics (GA, Mixpanel) setup
└── validations.ts    # Zod schemas for forms
```

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/utils/` | App-specific utilities (formatters, date helpers) |
| `src/schemas/` | Zod validation schemas |
| `src/services/` | API client (HTTP library config) |
| `src/components/ui/` | Uses `cn()` from `lib/utils.ts` extensively |

---

## 📌 `lib/` vs `utils/` — Key Difference

| `lib/` | `utils/` |
|--------|---------|
| Third-party library wrappers | App-specific helper functions |
| `cn()`, auth config, stripe init | `formatDate()`, `formatCurrency()` |
| Infrastructure-level code | Business-logic helpers |
| Rarely changes | Changes with app features |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
