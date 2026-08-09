# 📁 context — React Context Providers

> **LeadPilot-AI | Frontend | React Context**

## Overview

`context/` mein **React Context API** se bane providers hain. Yeh aise data ya functions provide karte hain jo component tree ke kisi bhi level par chahiye hon — bina prop drilling ke.

---

## 📂 Directory Structure

```
context/
└── AuthContext.tsx    # Authentication context & provider
```

---

## 📦 File Details

### `AuthContext.tsx`
**Purpose:** Authentication state ko poori application mein share karna

Yeh context provide karta hai:
- Current logged-in user info
- Auth loading state
- Login / Logout functions
- Token management
- Permission checking utilities

**Implementation Pattern:**
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (token validation)
    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string) => {
    // Login API call
    // Set user state
    // Store token
  }

  const logout = () => {
    setUser(null)
    // Clear token
    // Redirect to login
  }

  const hasPermission = (permission: string) => {
    return user?.permissions?.includes(permission) ?? false
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for consuming auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

**Usage in components:**
```typescript
import { useAuth } from '@/context/AuthContext'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  
  return (
    <header>
      {isAuthenticated ? (
        <button onClick={logout}>Logout ({user?.name})</button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  )
}
```

---

## 🔑 Context vs Store — When to Use What?

| React Context | Global Store (Zustand) |
|--------------|----------------------|
| Auth state (user, token) | UI preferences (theme, sidebar) |
| Dependency injection | Shared cached data |
| Rarely updated data | Frequently updated data |
| `AuthContext`, `ThemeContext` | Notifications, Filters |

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/providers/` | `AppProvider` wraps all contexts |
| `src/store/` | Alternative for global state |
| `src/features/auth/` | Auth logic (API calls) used by AuthContext |
| `src/types/` | `User` type used in context |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
