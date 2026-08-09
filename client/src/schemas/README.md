# 📁 schemas — Validation Schemas (Zod)

> **LeadPilot-AI | Frontend | Form Validation Schemas**

## Overview

`schemas/` mein **Zod validation schemas** hain jo forms, API responses aur user input validate karte hain. Zod TypeScript-first runtime validation library hai — iska matlab yeh schemas runtime par bhi enforce hote hain (sirf compile time par nahi).

---

## 📂 Directory Structure

```
schemas/
└── lead.schema.ts    # Lead form validation schema
```

---

## 📦 File Details

### `lead.schema.ts`
**Purpose:** Lead creation/editing form ka validation schema

```typescript
import { z } from 'zod'

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long'),
    
  email: z
    .string()
    .email('Please enter a valid email address'),
    
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s-]{10,}$/.test(val),
      'Please enter a valid phone number'
    ),
    
  company: z.string().optional(),
  
  status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']),
  
  score: z
    .number()
    .min(0, 'Score cannot be negative')
    .max(100, 'Score cannot exceed 100')
    .default(0),
    
  notes: z.string().max(500, 'Notes too long').optional(),
})

// TypeScript type inferred from schema
export type LeadFormData = z.infer<typeof leadSchema>
```

**Usage with React Hook Form:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadSchema, type LeadFormData } from '@/schemas/lead.schema'

const LeadForm = () => {
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      status: 'new',
      score: 0,
    },
  })
  
  const onSubmit = (data: LeadFormData) => {
    // data is fully typed and validated!
    createLead(data)
  }
}
```

---

## 🔧 More Schemas to Add

As the app grows:

```
schemas/
├── lead.schema.ts        # Lead form validation
├── campaign.schema.ts    # Campaign creation form
├── auth.schema.ts        # Login/Register forms
├── user.schema.ts        # User profile form
└── company.schema.ts     # Company form
```

---

## ✅ Why Zod?

| Feature | Benefit |
|---------|---------|
| TypeScript-first | Auto-generates types from schema |
| Runtime validation | Catches errors at runtime, not just compile time |
| Composable | Schemas can be extended, merged, transformed |
| Form integration | Works with React Hook Form via `zodResolver` |
| Error messages | Customizable, user-friendly error messages |

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/types/` | Schemas can infer TypeScript types |
| `src/features/` | Features use schemas to validate API data |
| `src/components/` | Form components use schemas via React Hook Form |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
