# Design System

## Color Palette

| Token | Value | Use |
|-------|-------|-----|
| Background dark | `#08090F` / `#0F1017` | Hero, chat widget, admin |
| Background light | `#F7F5F0` | Services, Experience sections |
| Blue primary | `#2563EB` | CTAs, user messages |
| Blue light | `#3B82F6` | Icons, accents |
| Violet | `#4F46E5` / `#7C3AED` | Gradient partner |
| Emerald | `#34D399` | Online indicator, success |
| Orange | `#F97316` | Emergency section |
| Slate text | `#94A3B8` | Body copy on dark bg |

## Typography
- Headings: bold, tight leading (1.0–1.1)
- Body: `text-sm` / `text-base`, `leading-relaxed`
- Labels/tags: `text-xs`, `font-semibold`, `tracking-wide`, `uppercase`

## Motion Tokens
- Section reveal: `opacity 0→1, y 28→0, duration 0.55, ease [0.22,1,0.36,1]`
- Spring panels: `stiffness 320, damping 30`
- Hover lift: `y -4 to -8`
- Tilt cards: `rotateX ±6, rotateY ±6`

## Borders & Shadows
- Cards on dark bg: `border: 1px solid rgba(255,255,255,0.07)`
- Cards on light bg: `border: border-slate-100`
- Glow shadows: `0 0 36px rgba(37,99,235,0.5)`

## Radii
- Buttons: `rounded-full` (pill) or `rounded-xl`
- Cards: `rounded-2xl`
- Chat panel: `rounded-3xl`
- Icons: `rounded-xl`
