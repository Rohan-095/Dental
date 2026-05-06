# CLAUDE.md

Project: Premium Dentist Website + AI Receptionist Platform

## Role

You are a senior full-stack developer, UI/UX designer, and AI automation architect.

You are building a premium Gen-Z dental website that will later become a complete AI receptionist product for dental clinics.

This is not just a normal website. It is a sellable client product.

The final system should include:

1. Public dentist marketing website
2. Floating AI chat widget
3. Admin dashboard
4. Appointment/lead management
5. Patient intake flow
6. Urgent triage alerts
7. Future AI voice agent using Vapi or Retell AI

---

## Very Important Rule

Do not start coding immediately.

Always follow this order:

1. Understand the project
2. Create/update documentation
3. Plan folder structure
4. Build small sections step by step
5. Test mobile and desktop
6. Run lint/build checks
7. Summarize what changed

If anything is unclear, make a reasonable assumption and write it in `/docs/DECISIONS.md`.

---

## Communication Style

Explain things simply.

Do not give long unnecessary explanations.

When making changes, always tell me:

1. What you changed
2. Which files you edited
3. What to test next

---

## Tech Stack

Use this stack unless clearly told otherwise:

- Next.js App Router
- React
- TypeScript if project already uses it
- Tailwind CSS
- lucide-react icons
- Framer Motion for animations
- Supabase when database is needed
- Vercel for hosting
- Vapi or Retell AI for future voice agent

Do not overengineer.

Start simple, then add layers.

---

## Design Direction

The public website should feel:

- Premium
- Gen-Z
- Modern
- Dental studio style
- Trustworthy
- Conversion-focused
- Smooth and interactive
- Webflow-style motion

Visual style:

- Dark premium hero section
- Cream/off-white content sections
- Electric blue, mint, or soft purple accent
- Big bold typography
- Rounded 2xl cards
- Soft shadows
- Glassmorphism panels
- Layered depth
- Floating badges
- Subtle gradients
- Smooth scroll animations
- Slight rotation effects
- 3D-style depth using CSS/Framer Motion

Do not make it childish, gaming-like, or too neon.

The website should feel like:

Apple + Webflow + premium dental studio + AI receptionist product.

---

## Motion Rules

Use motion carefully.

Allowed:

- Smooth section reveal
- Hero entrance animation
- Floating hero cards
- Rotating ring or badge
- Hover tilt cards
- Chat widget open/close animation
- Subtle parallax
- Smooth CTA hover lift

Avoid:

- Too much spinning
- Too many particles
- Heavy 3D everywhere
- Anything that slows mobile performance
- Animations that make text hard to read

Admin dashboard should stay clean and simple. Do not add heavy 3D effects in admin.

---

## Product Phases

### Phase 1 — Public Website UI

Build:

- Homepage
- Header
- Hero section
- Trust strip
- Services section
- Why choose us
- AI receptionist preview
- Reviews
- Emergency CTA
- Contact/booking CTA
- Footer
- Floating chat widget mockup

No backend required in Phase 1.

---

### Phase 2 — Working Chat Widget

Build:

- Consent gate
- Chat interface
- Quick replies
- FAQ answers
- Lead capture
- Appointment request flow
- Urgent keyword detection
- Save conversations to database

AI must not diagnose or give medical advice.

---

### Phase 3 — Admin Dashboard

Build `/admin` with:

- Overview
- Leads
- Appointments
- Conversations
- Triage alerts
- Intake forms
- FAQ manager
- Voice calls placeholder
- Settings

Admin should be clean, fast, and simple.

---

### Phase 4 — Voice Agent

Prepare future integration for:

- Vapi
- Retell AI

Voice flow:

Patient calls
→ AI voice agent answers
→ collects info
→ detects urgency
→ books appointment or creates lead
→ sends transcript and summary to admin
→ alerts staff if urgent

---

## Folder Structure

Use this structure:

```txt
app/
  page.jsx or page.tsx
  layout.jsx or layout.tsx
  globals.css

  components/
    layout/
      Header.jsx
      Footer.jsx

    home/
      Hero.jsx
      TrustStrip.jsx
      Services.jsx
      Experience.jsx
      AIReceptionistPreview.jsx
      Gallery.jsx
      Reviews.jsx
      EmergencyCTA.jsx
      FinalCTA.jsx

    chat/
      FloatingChatWidget.jsx
      ChatPanel.jsx
      ConsentGate.jsx

    admin/
      AdminLayout.jsx
      Sidebar.jsx
      StatCard.jsx
      DataTable.jsx

  admin/
    page.jsx
    leads/
      page.jsx
    appointments/
      page.jsx
    conversations/
      page.jsx
    triage/
      page.jsx
    intakes/
      page.jsx
    voice-calls/
      page.jsx
    settings/
      page.jsx

  api/
    leads/
      route.js

data/
  clinic.js
  services.js
  reviews.js
  faqs.js

lib/
  utils.js

docs/
  PROJECT_BRIEF.md
  INTAKE.md
  FEATURES.md
  USER_FLOWS.md
  DESIGN_SYSTEM.md
  TECH_ARCHITECTURE.md
  API_PLAN.md
  DATABASE_SCHEMA.md
  TASKS.md
  CHANGELOG.md
  DECISIONS.md
  QA_CHECKLIST.md

---

## Hero Video Rule

Public marketing pages may use a premium autoplay hero video.

Rules:
- Use video only where it improves conversion and brand feeling
- Hero video must be `muted`, `autoPlay`, `loop`, and `playsInline`
- Always include a `poster` image fallback
- Use dark overlay (`from-black/55`) for text readability
- Keep mobile performance optimized — `preload="metadata"` only
- Prefer video card layout (right column) over full-screen background video
- Full-screen background video allowed only with `bg-black/60` overlay
- Store videos in `/public/videos/`
- Store poster images in `/public/images/`
- Keep video files compressed and under 8 MB — short 5–12 second loops only
- Do not use large uncompressed video files

Best layout:
```
Hero left  = headline + CTAs + social proof
Hero right = rounded video card + floating badges
Bottom-right = Ask Ava chat widget (FloatingChatWidget)
```