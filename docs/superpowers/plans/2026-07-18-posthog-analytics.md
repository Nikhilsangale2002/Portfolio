# PostHog Analytics Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add PostHog Cloud analytics to the portfolio so pageviews/visitor counts are tracked, plus four named interaction events (resume download, project link click, social click, contact email click).

**Architecture:** `posthog-js` (React bindings) initialized once in `src/main.jsx` via `<PostHogProvider>`. Autocapture + default pageview handle general traffic. Individual components call `usePostHog().capture(...)` on the specific interactions called out in the spec.

**Tech Stack:** Vite 7, React 19, `posthog-js` (npm), PostHog Cloud (US or EU region — user's existing choice from account creation).

## Global Constraints

- No cookie-consent banner — tracking starts immediately on load (spec decision).
- `person_profiles: 'always'` on the PostHogProvider config — spec requires real visitor/People counts, not just anonymous events.
- Env vars: `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`, read via `import.meta.env` (Vite convention), stored in `.env.local` (already covered by the `*.local` rule in `.gitignore` — do not add a separate `.env` entry).
- **This repo has no test runner** (`package.json` only has `lint`/`dev`/`build`/`preview`/`deploy` scripts, no vitest/jest). Verification in every task is manual: the dev server + PostHog's Live Events / Activity view in the PostHog Cloud UI, and browser DevTools Network tab. Do not invent a test framework for this plan.
- Single-page site, no router — do not add route-change tracking logic.

---

### Task 1: PostHog account, `posthog-js` install, and env scaffolding

**Files:**
- Create: `.env.local` (gitignored — real key goes here)
- Create: `.env.example` (committed — placeholder values, documents the required vars)
- Modify: `package.json` (via `npm install`)

**Interfaces:**
- Produces: env vars `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST`, consumed by Task 2's `main.jsx` init.

- [ ] **Step 1: Create a PostHog Cloud account and project**

This is a manual, one-time action outside the codebase:
1. Go to https://posthog.com, sign up for a free Cloud account, choose US or EU hosting when prompted (either works — EU if you want data residency in Europe).
2. Create a new project (or use the default one created on signup).
3. In the project's **Settings → Project → Project API Key** page, copy the **Project API Key** (starts with `phc_...`) and note the **API Host** shown there (either `https://us.i.posthog.com` or `https://eu.i.posthog.com` depending on region chosen).

- [ ] **Step 2: Install the `posthog-js` package**

Run: `npm install posthog-js`
Expected: `posthog-js` appears under `dependencies` in `package.json`, install completes with no errors.

- [ ] **Step 3: Create `.env.local` with the real key**

```
VITE_POSTHOG_KEY=phc_your_actual_project_api_key
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

Use the actual key and host copied in Step 1. This file is already gitignored by the existing `*.local` rule in `.gitignore` — confirm with `git status` that it does NOT show up as untracked.

- [ ] **Step 4: Create `.env.example` (committed placeholder)**

```
VITE_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

- [ ] **Step 5: Verify the install doesn't break the dev server**

Run: `npm run dev`
Expected: Vite starts cleanly on its usual port, no console errors. Stop the server after confirming (Ctrl+C).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "Add posthog-js dependency and env scaffolding"
```

---

### Task 2: Initialize PostHog in `main.jsx`

**Files:**
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST` (Task 1)
- Produces: `PostHogProvider` wrapping `<App />`, making `usePostHog()` available to every component (consumed by Tasks 3-6)

- [ ] **Step 1: Update `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import App from './App.jsx'

const posthogOptions = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  person_profiles: 'always',
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_POSTHOG_KEY}
      options={posthogOptions}
    >
      <App />
    </PostHogProvider>
  </StrictMode>,
)
```

- [ ] **Step 2: Verify pageview tracking manually**

Run: `npm run dev`, open the printed local URL in a browser.
In a separate tab, open your PostHog project → **Activity → Live Events** (or **Activity Explorer**).
Expected: within a few seconds, a `$pageview` event appears with the correct URL. If nothing appears, open browser DevTools → Network tab, filter for `posthog` or the configured host, and confirm a request to `.../e/` or `/i/v0/e/` returns a 200 — a failure here usually means the API key or host env var is wrong.

- [ ] **Step 3: Commit**

```bash
git add src/main.jsx
git commit -m "Initialize PostHog analytics provider"
```

---

### Task 3: `resume_download` event

**Files:**
- Modify: `src/components/Hero.jsx:1-5` (imports), `src/components/Hero.jsx:107-114` (resume link)

**Interfaces:**
- Consumes: `usePostHog` from `posthog-js/react` (Task 2 makes the provider available)

- [ ] **Step 1: Add the `usePostHog` import and hook**

In `src/components/Hero.jsx`, update the import block at the top:

```jsx
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, lazy, Suspense } from "react"
import { ArrowDown, Download, ArrowUpRight } from "lucide-react"
import { usePostHog } from "posthog-js/react"
import Reveal from "./Reveal"
import resumePdf from "../assets/Nikhil_Sangale_9075910683.pdf"
```

Then inside the `Hero` component function, add near the top of the function body (alongside any existing hooks like `useRef`):

```jsx
const posthog = usePostHog()
```

- [ ] **Step 2: Fire the event on click**

Update the resume link (currently at `src/components/Hero.jsx:107-114`):

```jsx
<a
  href={resumePdf}
  download="Nikhil_Sangale_Resume.pdf"
  aria-label="Download resume"
  onClick={() => posthog?.capture('resume_download')}
  className="group flex items-center justify-center w-12 h-12 border border-white/25 rounded-full text-white hover:border-white/60 transition-all duration-300"
>
  <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
</a>
```

- [ ] **Step 3: Verify manually**

Run: `npm run dev`, open the site, click the resume download icon in the Hero section.
Expected: PostHog Live Events shows a `resume_download` event immediately after the click.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "Track resume_download event"
```

---

### Task 4: `project_link_click` event

**Files:**
- Modify: `src/components/Projects.jsx:1-6` (imports), `src/components/Projects.jsx:294-305` (repository link)

**Interfaces:**
- Consumes: `usePostHog` from `posthog-js/react`; `selected.title` and `selected.link` from existing component state

- [ ] **Step 1: Add the `usePostHog` import and hook**

Update the import block at the top of `src/components/Projects.jsx`:

```jsx
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { usePostHog } from "posthog-js/react"
import Reveal, { BlurIn } from "./Reveal"
import { createPortal } from "react-dom"
import { ArrowUpRight, Github, X, Brain, Code2, Briefcase, Search } from "lucide-react"
import kavachaiLogo from "../assets/KavachAI.svg"
```

Inside the `Projects` component function, add alongside the existing `useState` calls:

```jsx
const posthog = usePostHog()
```

- [ ] **Step 2: Fire the event on click**

Update the repository link (currently at `src/components/Projects.jsx:294-305`):

```jsx
{selected.link && (
  <a
    href={selected.link}
    target="_blank"
    rel="noreferrer"
    onClick={() => posthog?.capture('project_link_click', { project: selected.title })}
    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-medium rounded-lg hover:brightness-110 transition-all duration-300"
  >
    <Github className="w-4 h-4" />
    View Repository
    <ArrowUpRight className="w-4 h-4" />
  </a>
)}
```

- [ ] **Step 3: Verify manually**

Run: `npm run dev`, open the site, open a project card modal (e.g. KavachAI), click "View Repository".
Expected: PostHog Live Events shows a `project_link_click` event with a `project` property equal to the project's title (e.g. `"KavachAI"`).

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "Track project_link_click event"
```

---

### Task 5: `social_click` events (Footer)

**Files:**
- Modify: `src/components/Footer.jsx` (entire file — small, shown in full below)

**Interfaces:**
- Consumes: `usePostHog` from `posthog-js/react`

- [ ] **Step 1: Rewrite `src/components/Footer.jsx` with the hook and click handlers**

```jsx
import { Github, Linkedin, Mail } from "lucide-react"
import { usePostHog } from "posthog-js/react"

const Footer = () => {
  const posthog = usePostHog()

  return (
    <footer className="py-8 text-center border-t border-border">
      <div className="flex justify-center gap-6 mb-4">
        <a
          href="https://github.com/nikhilsangale2002"
          className="text-muted-foreground hover:text-primary transition-colors"
          target="_blank"
          rel="noreferrer"
          onClick={() => posthog?.capture('social_click', { platform: 'github' })}
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/nikhil-sangale-053921292"
          className="text-muted-foreground hover:text-primary transition-colors"
          target="_blank"
          rel="noreferrer"
          onClick={() => posthog?.capture('social_click', { platform: 'linkedin' })}
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="mailto:nikhilsangale121@gmail.com"
          className="text-muted-foreground hover:text-primary transition-colors"
          onClick={() => posthog?.capture('social_click', { platform: 'email' })}
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
      <p className="text-sm text-muted-foreground">&copy; 2026 Nikhil Sangale. All rights reserved.</p>
    </footer>
  )
}

export default Footer
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, open the site, click each of the three footer icons (GitHub, LinkedIn, Mail) in turn.
Expected: PostHog Live Events shows three separate `social_click` events, each with a `platform` property of `github`, `linkedin`, and `email` respectively.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "Track social_click events in footer"
```

---

### Task 6: `contact_email_click` event

**Files:**
- Modify: `src/components/Contact.jsx:1-4` (imports), `src/components/Contact.jsx:139-146` ("Email instead" link)

**Interfaces:**
- Consumes: `usePostHog` from `posthog-js/react`

- [ ] **Step 1: Add the `usePostHog` import and hook**

Update the import block at the top of `src/components/Contact.jsx`:

```jsx
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Send, ArrowUpRight } from "lucide-react"
import { usePostHog } from "posthog-js/react"
import Reveal, { BlurIn } from "./Reveal"
```

Inside the `Contact` component function, add alongside the existing `useRef`/`useState` calls:

```jsx
const posthog = usePostHog()
```

- [ ] **Step 2: Fire the event on click**

Update the "Email instead" link (currently at `src/components/Contact.jsx:139-146`):

```jsx
<a
  href="mailto:nikhilsangale121@gmail.com"
  onClick={() => posthog?.capture('contact_email_click')}
  className="group w-full md:w-auto px-8 py-3.5 border border-border text-foreground font-display font-medium rounded-full
    hover:border-foreground/40 transition-all duration-300 flex items-center justify-center gap-2"
>
  Email instead
  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
</a>
```

- [ ] **Step 3: Verify manually**

Run: `npm run dev`, open the site, scroll to Contact, click "Email instead".
Expected: PostHog Live Events shows a `contact_email_click` event.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "Track contact_email_click event"
```

---

### Task 7: End-to-end verification and production build check

**Files:** none (verification only)

**Interfaces:** none — this task only exercises what Tasks 1-6 built.

- [ ] **Step 1: Full manual click-through**

Run: `npm run dev`. With PostHog's Live Events view open, in order: load the homepage, click a nav link, open a project and click "View Repository", click the resume download icon, click each footer social icon, scroll to Contact and click "Email instead".
Expected: one `$pageview` plus one each of `project_link_click`, `resume_download`, `social_click` (x3, different `platform` values), `contact_email_click` — all visible in Live Events with correct properties.

- [ ] **Step 2: Verify the production build embeds the env vars correctly**

Run: `npm run build`
Expected: build succeeds with no errors. Then run `npm run preview`, open the printed URL, and confirm a `$pageview` still shows up in PostHog Live Events (confirms `VITE_POSTHOG_KEY`/`VITE_POSTHOG_HOST` were correctly inlined at build time, not left as `undefined`).

- [ ] **Step 3: Stop preview server**

Ctrl+C to stop `npm run preview`. No commit needed — this task is verification-only, nothing changed since Task 6's commit.

---

## Deployment note (not part of this plan)

Once verified, deploying is the existing `npm run deploy` (`vite build && gh-pages -d dist`) — unchanged by this work. Just confirm `.env.local` exists locally with the real key before running it, since the build step needs those vars at build time.
