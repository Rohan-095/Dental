# Tech Architecture

## Stack
- **Framework:** Next.js App Router (v16.2.4)
- **Language:** TypeScript (strict: false, allowJs: true for mixed migration)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` syntax)
- **Animation:** Framer Motion v12.38.0 + Lenis v1.3.23
- **Icons:** lucide-react v1.14.0
- **Database:** Supabase (Phase 2+)
- **Hosting:** Vercel

## Folder Structure
```
app/
  page.js                     ← Homepage orchestrator
  layout.js                   ← Root layout + metadata
  globals.css                 ← Tailwind base
  components/
    SmoothScrollProvider.jsx  ← Lenis wrapper
    layout/Header.tsx, Footer.tsx
    home/                     ← 9 homepage sections
    chat/                     ← FloatingChatWidget, ConsentGate, ChatPanel
    admin/                    ← AdminLayout, Sidebar, StatCard, DataTable
  admin/                      ← Admin route pages
  api/leads/route.js          ← Lead capture endpoint

data/                         ← All business content (root level)
  clinic.ts, services.ts, reviews.ts, faqs.ts

lib/utils.ts                  ← buildWA, formatPhone, cn

docs/                         ← Project documentation
```

## Key Conventions
- `'use client'` on all interactive/animated components
- Path alias `@/*` → project root
- Data always in data/ — never hardcoded in JSX
- `as const` on bezier ease arrays and spring `type` literals
