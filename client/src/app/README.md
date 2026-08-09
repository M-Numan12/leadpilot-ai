# 📁 app — Next.js App Router Directory

> **LeadPilot-AI | Frontend | Next.js 14 App Directory**

## Overview

`app/` is the **root routing directory** of the LeadPilot-AI frontend built with **Next.js 14 App Router**. Every folder inside this directory automatically becomes a route. Special files like `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` control the UI for specific states.

---

## 📂 Directory Structure

```
app/
├── (auth)/                  # Auth route group (login, register, etc.)
│   ├── forgot-password/     # Forgot password page
│   ├── login/               # Login page
│   ├── register/            # Register/Signup page
│   └── verify-email/        # Email verification page
│
├── (marketing)/             # Marketing / landing pages group
│
├── admin/                   # Admin panel routes
│
├── api/                     # Next.js API route handlers (server-side)
│
├── dashboard/               # Main app dashboard routes
│   ├── ai-agent/            # AI Agent chat page
│   ├── analytics/           # Analytics & reporting page
│   ├── billing/             # Billing & subscription page
│   ├── calendar/            # Calendar view page
│   ├── campaigns/           # Campaign management page
│   ├── companies/           # Companies/Organizations page
│   ├── contacts/            # Contacts management page
│   ├── conversations/       # Conversations & messaging page
│   ├── crm/                 # CRM overview page
│   ├── integrations/        # Third-party integrations page
│   ├── leads/               # Leads management page
│   ├── overview/            # Dashboard overview/home page
│   ├── proposals/           # Proposals management page
│   ├── settings/            # User & app settings page
│   ├── tasks/               # Task management page
│   └── team/                # Team management page
│
├── error.tsx                # Global error boundary component
├── layout.tsx               # Root layout (applies to all pages)
├── loading.tsx              # Global loading state UI
└── not-found.tsx            # 404 Not Found page
```

---

## 🗂 Route Groups Explained

### `(auth)/` — Authentication Group
- Wrapped in parentheses = **route group** (doesn't affect URL path)
- Handles all authentication flows: login, register, forgot password, email verification
- These pages are **public** (no auth required)

### `(marketing)/` — Marketing Group
- Landing page, pricing, features, about pages
- **Public** routes for non-logged-in visitors

### `dashboard/` — Protected App
- The **main application** after login
- Contains all 16 feature modules
- Protected by middleware (requires authentication)

### `admin/` — Admin Panel
- Super-admin routes
- Role-based access control

### `api/` — Server-side API Routes
- Next.js Route Handlers
- Backend API calls made server-side

---

## 🔑 Special Files

| File | Purpose |
|------|---------|
| `layout.tsx` | Root layout wrapping all pages (fonts, providers, etc.) |
| `loading.tsx` | Suspense-based loading skeleton for all routes |
| `error.tsx` | Error boundary — catches runtime errors in pages |
| `not-found.tsx` | Custom 404 page shown for unknown routes |

---

## ⚙️ How Routing Works

```
URL: /dashboard/leads        → app/dashboard/leads/page.tsx
URL: /login                  → app/(auth)/login/page.tsx
URL: /                       → app/(marketing)/page.tsx
URL: /admin                  → app/admin/page.tsx
```

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/components/` | UI components used inside pages |
| `src/features/` | Business logic & feature-level code |
| `src/providers/` | React context providers (AppProvider) |
| `src/services/` | API service calls |
| `src/store/` | Global state management |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
