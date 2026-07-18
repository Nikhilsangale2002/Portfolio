# PostHog Analytics Integration — Design

## Goal
Track visits and visitor counts on the portfolio (github.io, Vite + React, no router), plus a handful of key interaction events, using PostHog Cloud.

## Approach
Use the `posthog-js` npm package with React initialization (not a raw `<script>` snippet, not self-hosted). This is idiomatic for the existing React/Vite codebase and makes custom event capture straightforward via the `usePostHog` hook.

## Setup
- `npm install posthog-js`
- New env vars in `.env.local` (already gitignored via the existing `*.local` rule in `.gitignore`):
  - `VITE_POSTHOG_KEY`
  - `VITE_POSTHOG_HOST` (PostHog Cloud region endpoint, e.g. `https://us.i.posthog.com`)
- Initialize PostHog in `src/main.jsx`, wrapping `<App />` in `<PostHogProvider>` with:
  - `person_profiles: 'always'` — ensures real visitor/People counts show up, not just anonymous events. Portfolio traffic is far under any free-tier limit.
  - Default `capture_pageview` behavior is sufficient — the site is a single page with anchor-based sections (no client-side router), so no manual route-change instrumentation is needed.
- Autocapture stays on (PostHog default) for general click/interaction visibility, layered with named custom events below for the interactions worth reporting on specifically.

## Custom events
| Event | Location | Notes |
|---|---|---|
| `resume_download` | [src/components/Hero.jsx:108](src/components/Hero.jsx#L108) | Resume link click |
| `project_link_click` | [src/components/Projects.jsx:296](src/components/Projects.jsx#L296) | Include project name as a property |
| `social_click` | [src/components/Footer.jsx:7-13](src/components/Footer.jsx#L7-L13) | Include `platform` property: github / linkedin / email |
| `contact_email_click` | [src/components/Contact.jsx:140](src/components/Contact.jsx#L140) | Contact section email link |

## Consent
No cookie-consent banner. Tracking starts immediately on page load. (Decision: personal portfolio, analytics-only use, low risk — can revisit later if it becomes a concern.)

## Out of scope
- Session replay / heatmaps (PostHog features available later without re-architecting; not part of this pass)
- Cookie-consent banner
- Server-side/self-hosted PostHog
- Changes to the GitHub Pages deploy process (still manual `npm run deploy` via `gh-pages`)

## Testing
Manual verification: run `npm run dev`, open PostHog's Activity/Live Events view, click through the site (nav, project cards, resume link, social links, contact email), confirm the pageview and each custom event lands with the expected properties.
