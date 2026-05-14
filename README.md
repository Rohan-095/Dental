# Ava Dental Studio — AI Receptionist Platform

Premium dental marketing site + AI receptionist platform. Built as a sellable client product: public landing page, floating AI chat widget, Vapi voice agent webhook, and Supabase-backed operator dashboard.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (incremental — see `docs/DECISIONS.md`)
- Tailwind CSS 4
- Framer Motion + Lenis (smooth scroll)
- Supabase (patients, appointments, calls, sms_logs)
- Vapi (voice agent webhook)
- Twilio (SMS), Google Calendar, Nodemailer

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Environment

Copy values into `.env.local` (gitignored). Required keys are listed in `docs/DECISIONS.md` and grouped by feature in the file itself. Phase 1 added auth-gate vars:

```
DASHBOARD_BASIC_AUTH_USER=<choose>
DASHBOARD_BASIC_AUTH_PASS=<strong password>
VAPI_WEBHOOK_SKIP_VERIFY=true   # local dev only
```

## Routes

- `/` — public marketing site
- `/admin/*` — mock/demo UI (not Supabase-wired, not auth-gated)
- `/dashboard/*` — live operator dashboard (Supabase, Basic Auth gated by `proxy.js`)
- `/api/leads` — public lead capture (still stub)
- `/api/appointments`, `/api/patients` — service-role, Basic Auth gated
- `/api/vapi/webhook` — Vapi tool calls; verifies `x-vapi-secret`

See `docs/ADMIN_VS_DASHBOARD.md` for which surface is canonical and why both exist.

## Documentation

All project docs live under `docs/`:

- `PROJECT_BRIEF.md` — overview
- `TASKS.md` — phased roadmap
- `DECISIONS.md` — architectural and security decisions
- `API_PLAN.md`, `DATABASE_SCHEMA.md` — backend
- `DESIGN_SYSTEM.md`, `USER_FLOWS.md`, `INTAKE.md` — UX
- `QA_CHECKLIST.md`, `CHANGELOG.md`
- `ADMIN_VS_DASHBOARD.md` — canonical vs demo surface

## Deployment

Hosted on Vercel. Set every env var listed in `docs/DECISIONS.md` in the project settings. Configure Vapi assistant `serverUrlSecret` to match `VAPI_WEBHOOK_SECRET`. Do not set `VAPI_WEBHOOK_SKIP_VERIFY` in production.
