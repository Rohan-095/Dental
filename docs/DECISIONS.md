# Decisions

## 2026-05-06

**TypeScript added mid-project**
Decision: Add tsconfig.json with `allowJs: true` and `strict: false`. Main page stays .js; new components are .tsx. Rationale: incremental migration without breaking existing code.

**`ease` arrays need `as const`**
Framer Motion v12 requires `readonly [number, number, number, number]` for bezier definitions. Plain arrays infer `number[]` which fails TypeScript. Fix: `[0.22, 1, 0.36, 1] as const` on all transition ease values.

**`type: 'spring'` needs `as const`**
Framer Motion v12 TypeScript: `AnimationGeneratorType` is a literal union. Fix: `type: 'spring' as const`.

**`transformStyle: 'preserve-3d'` needs `as any`**
Framer Motion's MotionStyle doesn't expose TransformStyle cleanly. Fix: cast to `any`.

**FloatingChatWidget split into 3 files**
CLAUDE.md requires separate FloatingChatWidget.tsx (orchestrator), ConsentGate.tsx, and ChatPanel.tsx. Each file owns its own `panelVariants` constant — no shared module needed for one small object.

**data/ at project root, not app/data/**
CLAUDE.md specifies root-level data/. First build used app/data/ (wrong). Corrected and old folder deleted.

**lucide-react brand icons don't exist**
Instagram, Twitter, Facebook icons are not in lucide-react v1.14.0. Use Globe, Link, ExternalLink as substitutes in Footer.

## 2026-05-14

**Phase 1 security gate — middleware + Vapi signature**
Added `middleware.js` (Basic Auth) over `/dashboard/*`, `/api/appointments/*`, `/api/patients/*`. These routes use the service-role Supabase client and had no auth; deploying as-is would have leaked PHI publicly. Vapi webhook now verifies a shared secret in `x-vapi-secret` against `VAPI_WEBHOOK_SECRET` before parsing the body. `/api/leads`, `/api/vapi/webhook`, `/admin/*`, and `/` are intentionally **not** gated by middleware (public site, mock-data scaffold, and signature-protected webhook respectively).

**New env vars (Phase 1)**
Add to `.env.local` (dev) and your hosting env (prod):

```
# Phase 1 auth gate
DASHBOARD_BASIC_AUTH_USER=<choose any username>
DASHBOARD_BASIC_AUTH_PASS=<choose a strong password>

# Vapi webhook
# VAPI_WEBHOOK_SECRET is already defined; set the same value in Vapi's
# assistant `serverUrlSecret` so it sends it as the x-vapi-secret header.
VAPI_WEBHOOK_SKIP_VERIFY=true   # local dev only — remove or set false in prod
```

Behavior:
- If `DASHBOARD_BASIC_AUTH_USER` / `DASHBOARD_BASIC_AUTH_PASS` are unset, protected routes return 503 (fail-closed) — they never silently allow access.
- If `VAPI_WEBHOOK_SECRET` is unset and skip-verify is off, the webhook returns 401 on every request.
- Browser hitting `/dashboard` gets a native Basic Auth prompt — no login UI required.

Not in Phase 1: RLS on Supabase tables, real auth UI, `/api/leads` persistence. Those are Phases 2–4 in the security plan.
