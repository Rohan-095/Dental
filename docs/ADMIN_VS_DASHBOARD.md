# Admin vs Dashboard

This project ships **two admin-style surfaces**. They have nearly identical purpose but very different implementations. This doc explains what each is, why both exist, and which one to build on going forward.

## Decision

**`/dashboard` is the canonical live operator UI.** `/admin` is the mock/demo UI used for sales walkthroughs and screenshots — kept for now but not the place to add real features.

Decision recorded 2026-05-14. See `DECISIONS.md` for the broader Phase 2 context.

## Side-by-side

| Aspect | `/admin/*` | `/dashboard/*` |
|---|---|---|
| File extensions | `.tsx` | `.js` |
| Pages | overview, leads, appointments, conversations, triage, intakes, voice-calls, settings (8 total) | overview, appointments, calls, patients (4 total) |
| Data source | `@/data/admin` (mock arrays) | `lib/supabase.getSupabaseAdmin()` — live service-role reads |
| UI components | `AdminLayout`, `AdminSidebar`, `StatCard`, `DataTable`, `StatusBadge` — reusable design system | None shared; each page renders its own table |
| Auth | None — public (mock data only, no PHI) | HTTP Basic Auth via `proxy.js` (Phase 1) |
| Mobile-ready | Built with the project's Tailwind + motion conventions | Plain, minimal styling |
| Editing risk | Low (no real data, no auth) | Higher (live PHI, gated route) |

## Why both exist

`/admin` was built first as the **product demo** — what the operator dashboard will look like once it's wired. It's the screenshot surface for sales, the UX prototype, and the place where the visual language was developed. It reads from `data/admin.js` so the demo always has predictable data.

`/dashboard` was added later as the **functional surface** — the route that actually pulls from Supabase. It's intentionally minimal because the priority was getting data flowing, not design.

The two trees have **zero cross-imports**. Each is self-contained. Either can be removed without breaking the other.

## Going forward

1. **Build new operator features in `/dashboard`** — that's where the live data lives.
2. **Lift design system components from `/admin` into `/dashboard` over time** — `StatCard`, `DataTable`, `StatusBadge`, `AdminLayout`, `AdminSidebar` are already reusable. Migrate them incrementally as `/dashboard` pages need polish.
3. **Keep `/admin` mock-only.** Do not wire it to Supabase. Do not gate it. It's for demos and design iteration.
4. **Do not delete `/admin` yet.** It still has business value for sales. A future Phase (likely Phase 5 or later) can decide whether to retire it once `/dashboard` has design parity.

## Phase 1 protection scope

`proxy.js` currently gates only `/dashboard/*` (and `/api/appointments/*`, `/api/patients/*`). `/admin` is intentionally **not** gated because it shows no real data. If `/admin` is ever wired to Supabase in the future, it must be added to `PROTECTED_PREFIXES` in `proxy.js` at the same time.
