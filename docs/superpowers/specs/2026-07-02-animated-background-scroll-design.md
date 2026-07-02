# Animated Background + Scroll Motion Upgrade — Design

**Date:** 2026-07-02
**Goal:** Designer-grade animated portfolio — live animated background on the landing page, buttery smooth scrolling, and richer scroll-linked animations across all sections.

## Decisions (user-approved)

- Style intent: designer-grade visual richness (not a Photoshop-UI gimmick).
- Background: interactive Three.js particle field (chosen over aurora waves / layered combo).
- Full package approved: particles + Lenis smooth scroll + upgraded reveals + grain overlay.

## Components

### 1. `src/components/ParticleBackground.jsx` (new)
- `@react-three/fiber` Canvas, fixed full-screen behind all content (`fixed inset-0 -z-10`, `aria-hidden`, `no-print`).
- ~2,200 particles in two depth layers (amber primary-tinted + faint white) that slowly drift/rotate and tilt toward the cursor with eased lerp.
- Safeguards: DPR capped at 1.5, `antialias: false`, `prefers-reduced-motion` renders a static field, rAF naturally pauses in hidden tabs.
- The unused legacy `src/components/Background3D.jsx` is deleted.
- `App.jsx` root loses `bg-background` (body already paints it) so the `-z-10` canvas is visible behind content.

### 2. Lenis smooth scrolling
- New dependency `lenis`; initialized in `App.jsx` via `useEffect` with `anchors: true` so `#section` links glide.
- Skipped entirely under `prefers-reduced-motion`.
- `data-lenis-prevent` on the project modal scroll container and mobile menu.
- CSS: `.lenis.lenis-smooth { scroll-behavior: auto !important; }`.

### 3. Scroll animations upgrade
- Shared `src/components/Reveal.jsx`: the Hero's masked-line reveal extracted, plus a mount mode and an on-scroll (`whileInView`) mode, and a `BlurIn` helper (blur-to-sharp + rise).
- Section headings (About, Projects, Experience, Contact) switch to masked-line reveals; intro paragraphs use `BlurIn`.
- About dossier card gets subtle scroll-linked parallax (±24px).
- Scroll progress bar: fixed 2px gradient bar at top, `useScroll` + spring `scaleX`.

### 4. Grain overlay
- Fixed full-screen SVG `feTurbulence` noise data-URI at ~4% opacity, `pointer-events-none`, `no-print` — film-grain texture over the whole page.

## Out of scope
Content, layout, section structure, and existing Hero entrance animations are unchanged.
