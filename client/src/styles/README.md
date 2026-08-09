# 📁 styles — Global Stylesheets

> **LeadPilot-AI | Frontend | Global CSS Styles**

## Overview

`styles/` mein **application-wide CSS/SCSS files** hain. Yeh folder global styling define karta hai jo saari pages par apply hoti hai — design tokens, CSS variables, base resets, aur typography.

---

## 📂 Directory Structure

```
styles/
└── globals.css    # Global CSS styles, CSS variables, base resets
```

---

## 📦 File Details

### `globals.css`
**Purpose:** Application-wide CSS — imported in root `layout.tsx`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===================== */
/* CSS Custom Properties  */
/* ===================== */
:root {
  /* Colors - Light Mode */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.dark {
  /* Colors - Dark Mode */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --secondary: 217.2 32.6% 17.5%;
  --muted: 217.2 32.6% 17.5%;
  --border: 217.2 32.6% 17.5%;
}

/* ===================== */
/* Base Resets            */
/* ===================== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
}

/* ===================== */
/* Scrollbar Styling      */
/* ===================== */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 3px;
}

/* ===================== */
/* Typography             */
/* ===================== */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
}

/* ===================== */
/* Utility Classes         */
/* ===================== */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 🎨 Design System

### Color Palette (LeadPilot Brand)

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | Blue `#3B82F6` | CTAs, active states |
| `--secondary` | Slate | Subtle backgrounds |
| `--destructive` | Red `#EF4444` | Delete, error states |
| `--accent` | Purple | Highlights, badges |
| `--border` | Gray | Borders, dividers |

### Typography Scale

| Size | Use Case |
|------|---------|
| `text-xs` (12px) | Labels, captions |
| `text-sm` (14px) | Body text, table content |
| `text-base` (16px) | Default body |
| `text-lg` (18px) | Card titles |
| `text-xl` (20px) | Section headings |
| `text-2xl` (24px) | Page headings |
| `text-3xl+` | Hero sections |

---

## 🔗 Related Directories

| Directory | Relation |
|-----------|---------|
| `src/app/layout.tsx` | Imports `globals.css` |
| `src/components/ui/` | Uses CSS variables |
| `src/lib/utils.ts` | `cn()` function for conditional classes |

---

*Last updated: 2026 | LeadPilot-AI Frontend Team*
