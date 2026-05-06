# Tasks

## Phase 1 — Public Website ✅
- [x] Header (transparent → glassmorphism sticky, mobile menu)
- [x] Hero (3D visual, floating badges, mouse-tracked tilt)
- [x] TrustStrip (count-up stats)
- [x] Services (tilt cards)
- [x] Experience / Why Us (rotated cards)
- [x] AI Receptionist Preview (mock chat UI)
- [x] Gallery (before/after)
- [x] Reviews (snap-scroll mobile, grid desktop)
- [x] EmergencyCTA (pulsing orange rings)
- [x] FinalCTA
- [x] Footer
- [x] FloatingChatWidget (consent gate → chat panel)
- [x] Lenis smooth scroll

## Phase 1 — Codebase Structure ✅
- [x] Split FloatingChatWidget into orchestrator + ConsentGate + ChatPanel
- [x] Create data/faqs.ts
- [x] Create lib/utils.ts
- [x] Create app/api/leads/route.js (stub)
- [x] Create app/components/admin/ stubs
- [x] Create app/admin/ placeholder pages
- [x] Create docs/ with all 12 files

## Phase 2 — Working Chat Widget 🔜
- [ ] Wire ConsentGate to save lead to Supabase
- [ ] Add urgent keyword detection (pain, emergency, swollen)
- [ ] Appointment request flow with date/time collection
- [ ] Save conversations to Supabase

## Phase 3 — Admin Dashboard 🔜
- [ ] Auth (simple password or Supabase Auth)
- [ ] Leads table with real data
- [ ] Appointments table
- [ ] Conversations viewer
- [ ] Triage alert badges
- [ ] Intake forms
