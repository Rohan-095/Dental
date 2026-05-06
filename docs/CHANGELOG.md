# Changelog

## 2026-05-06

### Added
- Full TypeScript homepage: Header, Hero, TrustStrip, Services, Experience, AIReceptionistPreview, Gallery, Reviews, EmergencyCTA, FinalCTA, Footer
- FloatingChatWidget split into 3 files: FloatingChatWidget.tsx (orchestrator), ConsentGate.tsx, ChatPanel.tsx
- data/clinic.ts, data/services.ts, data/reviews.ts, data/faqs.ts at project root
- lib/utils.ts with buildWA, formatPhone, cn helpers
- app/api/leads/route.js (stub, ready for Supabase)
- app/components/admin/: AdminLayout, Sidebar, StatCard, DataTable
- app/admin/ pages: overview, leads, appointments, conversations, triage, intakes, voice-calls, settings
- docs/ with 12 files
- tsconfig.json with allowJs: true for mixed JS/TSX project
- Lenis smooth scroll provider

### Removed
- Stale first-build components: BeforeAfter, BookCTA, ChatWidget, FloatingButtons, Footer (root), Hero (root), Navbar, Services (root), Testimonials, WhyUs
- app/data/ folder (moved to project root data/)
