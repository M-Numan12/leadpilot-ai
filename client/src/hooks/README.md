# 📁 hooks — Custom React Hooks

> **LeadPilot-AI | Frontend | Custom Hooks**

## Overview

`hooks/` mein application-wide **reusable custom React hooks** hote hain jo multiple features ya components mein use hote hain. Feature-specific hooks `features/` mein hote hain — yahan sirf **globally shared** hooks rakhay jate hain.

---

## 📂 Directory Structure

```
hooks/
└── useAgent.ts    # Hook for AI Agent interactions
```

---

## 📦 Hooks Detail

### `useAgent.ts`
**Purpose:** AI Agent ke saath interact karne ka unified hook

Yeh hook provide karta hai:
- Agent conversation start/stop karna
- Messages send/receive karna
- Agent status check karna (typing, idle, error)
- Agent session management

**Usage:**
```typescript
import { useAgent } from '@/hooks/useAgent'

const MyComponent = () => {
  const { sendMessage, messages, isLoading } = useAgent()
  
  return (
    // Agent chat UI
  )
}
```

---

## 🧩 Hook Design Rules

1. **Global only** — agar hook sirf ek feature mein use ho, use `features/<name>/` mein rakhein
2. **No side effects without cleanup** — useEffect mein cleanup function zaroor return karein
3. **TypeScript strict** — sab kuch properly typed hona chahiye
4. **Single responsibility** — ek hook ek kaam karay

---

## 📋 Common Hook Patterns Used

```typescript
// Data fetching hook
export function useData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // fetch logic
  }, [])
  
  return { data, loading, error }
}
```

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/features/` | Feature-specific hooks live here |
| `src/components/` | Components that consume these hooks |
| `src/services/` | API calls made inside hooks |
| `src/context/` | Context values accessed via hooks |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
