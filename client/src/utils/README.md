# 📁 utils — Utility / Helper Functions

> **LeadPilot-AI | Frontend | App-Specific Utilities**

## Overview

`utils/` mein **application-specific helper functions** hain. Yeh reusable pure functions hain jo data formatting, transformation, aur calculations handle karte hain — koi UI, koi state, koi API calls nahi.

---

## 📂 Directory Structure

```
utils/
└── formatters.ts    # Data formatting utility functions
```

---

## 📦 File Details

### `formatters.ts`
**Purpose:** Data ko human-readable format mein convert karna

```typescript
// =====================
// Date Formatting
// =====================
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const target = new Date(date)
  const diffMs = now.getTime() - target.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

// =====================
// Number Formatting
// =====================
export function formatCurrency(
  amount: number,
  currency = 'PKR',
  locale = 'en-PK'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en').format(num)
}

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return String(num)
}

// =====================
// Percentage Formatting
// =====================
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

// =====================
// String Utilities
// =====================
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// =====================
// Lead Utilities
// =====================
export function getLeadScoreColor(score: number): string {
  if (score >= 80) return 'text-green-500'
  if (score >= 60) return 'text-yellow-500'
  if (score >= 40) return 'text-orange-500'
  return 'text-red-500'
}

export function getStatusBadgeVariant(status: string) {
  const variants: Record<string, string> = {
    new: 'blue',
    contacted: 'yellow',
    qualified: 'purple',
    proposal: 'orange',
    won: 'green',
    lost: 'red',
    active: 'green',
    inactive: 'gray',
    pending: 'yellow',
  }
  return variants[status] || 'gray'
}
```

---

## 📤 Import Pattern

```typescript
import {
  formatDate,
  formatCurrency,
  formatCompactNumber,
  getInitials,
  truncateText
} from '@/utils/formatters'

// Usage examples:
formatDate('2024-01-15')           // "15 Jan 2024"
formatCurrency(50000)              // "PKR 50,000"
formatCompactNumber(1500000)       // "1.5M"
getInitials('Muhammad Numan')      // "MN"
truncateText('Long text here...', 30)
```

---

## 🧩 Utility Function Rules

1. **Pure functions only** — no side effects, no state
2. **No imports from features or components** — utils are at the bottom of dependency chain
3. **Always typed** — proper TypeScript input/output types
4. **Unit testable** — easy to test in isolation
5. **Single responsibility** — one function, one job

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/lib/` | Library configs (different from app utils) |
| `src/constants/` | Constants used inside utility functions |
| `src/types/` | Types used in utility function signatures |
| `src/components/` | Components consume these utility functions |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
