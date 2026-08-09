# 📁 providers — React Providers / Wrappers

> **LeadPilot-AI | Frontend | App-level Providers**

## Overview

`providers/` mein **React Provider components** hain jo poori application ko wrap karte hain. Providers kisi bhi context, state ya third-party library ko app mein globally available banate hain.

---

## 📂 Directory Structure

```
providers/
└── AppProvider.tsx    # Root provider that wraps the entire app
```

---

## 📦 File Details

### `AppProvider.tsx`
**Purpose:** Single root provider jo saari contexts aur providers ko combine karta hai

Ek provider tree aisa hota hai:

```typescript
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 minutes
      retry: 1,
    },
  },
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

**Used in root layout:**
```typescript
// app/layout.tsx
import { AppProvider } from '@/providers/AppProvider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
```

---

## 🏗 Provider Order (Important!)

Provider order matters! Inner providers can use outer provider's values:

```
QueryClientProvider (TanStack Query)
  └── ThemeProvider (next-themes)
       └── AuthProvider (custom auth)
            └── App Content
```

**Rule:** Put providers that others depend on — **outer first**.

---

## 🔧 Common Providers

| Provider | Library | Purpose |
|---------|---------|---------|
| `QueryClientProvider` | TanStack Query | Server state, data fetching |
| `AuthProvider` | Custom (context/) | Authentication state |
| `ThemeProvider` | next-themes | Dark/light mode |
| `Toaster` | sonner / shadcn | Toast notifications |
| `StoreProvider` | Zustand | Global client state |

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/context/` | Context providers used inside AppProvider |
| `src/store/` | Global state initialized here |
| `src/app/layout.tsx` | Where AppProvider is applied |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
