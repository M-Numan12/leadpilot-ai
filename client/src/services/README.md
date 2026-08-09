# 📁 services — API Service Layer

> **LeadPilot-AI | Frontend | API Services**

## Overview

`services/` mein **HTTP client configuration** aur **API base setup** hota hai. Yeh directory frontend aur backend ke darmiyan ki **bridge** hai. Saare API calls is directory ke through jate hain.

---

## 📂 Directory Structure

```
services/
└── api.ts    # Configured Axios/Fetch HTTP client instance
```

---

## 📦 File Details

### `api.ts`
**Purpose:** Centralized HTTP client setup

Yeh file provide karta hai:
- Pre-configured Axios instance with base URL
- Request interceptors (auth token attach karna)
- Response interceptors (error handling, token refresh)
- TypeScript-typed API methods (GET, POST, PUT, DELETE)

**Example Setup:**
```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — auth token attach karta hai
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — errors handle karta hai
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error)
  }
)

export default api
```

**Usage in features:**
```typescript
import api from '@/services/api'

export const fetchLeads = async () => {
  const response = await api.get('/leads')
  return response.data
}
```

---

## 🔑 Key Concepts

### Base URL
- Development: `http://localhost:8000/api`
- Production: Set in `.env.local` as `NEXT_PUBLIC_API_URL`

### Authentication
- JWT Bearer token automatically attached to every request
- Token stored in `localStorage` / `httpOnly cookie`

### Error Handling
- 401 → Redirect to login (token expired)
- 403 → Show "Unauthorized" message
- 500 → Show "Server Error" toast notification

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/features/` | Features use this API client for data fetching |
| `src/hooks/` | Hooks that wrap API calls |
| `src/store/` | State updated after API responses |
| `.env.local` | Contains `NEXT_PUBLIC_API_URL` |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
