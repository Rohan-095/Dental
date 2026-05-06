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
