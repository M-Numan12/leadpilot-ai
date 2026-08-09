# 📁 store — Global State Management

> **LeadPilot-AI | Frontend | Global State**

## Overview

`store/` mein application-level **global state** manage hoti hai. Jab koi state multiple components ya pages mein share karni ho, tab yahan rakhte hain. Local component state `useState` se handle hoti hai.

---

## 📂 Directory Structure

```
store/
└── index.ts    # Main store export / configuration
```

---

## 📦 File Details

### `index.ts`
**Purpose:** Global store ki configuration aur export

Possible state management patterns:
- **Zustand** (lightweight, recommended for this project)
- **Redux Toolkit** (heavy-duty apps)
- **Jotai** (atomic state)

**Zustand Example Setup:**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStore {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // UI state
  sidebarOpen: boolean
  toggleSidebar: () => void
  
  // Notifications
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  clearNotifications: () => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      notifications: [],
      addNotification: (n) => set((state) => ({ notifications: [...state.notifications, n] })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    { name: 'leadpilot-storage' }
  )
)
```

**Usage:**
```typescript
import { useAppStore } from '@/store'

const MyComponent = () => {
  const { user, sidebarOpen, toggleSidebar } = useAppStore()
  // ...
}
```

---

## 🗂 What Goes in Global Store?

| ✅ Global Store | ❌ Local State (useState) |
|----------------|--------------------------|
| Logged-in user info | Form input values |
| Auth token | Modal open/close (local) |
| Sidebar open/close | Loading state of one button |
| Active theme (dark/light) | Hover state |
| Global notifications/toasts | Component-specific counters |

---

## 🔑 Design Principles

1. **Minimal global state** — only what's truly shared
2. **Persist when needed** — use `persist` middleware for user preferences
3. **Feature state in features** — don't bloat the global store
4. **Selectors for performance** — subscribe to only what you need

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/features/` | Feature-level state (not global) |
| `src/context/` | React Context for DI (alternative to store) |
| `src/providers/` | AppProvider wraps the store |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
