# Portfolio Website — Design Spec

**Date:** 2026-05-01  
**Stack:** React 19 + TypeScript + Vite (existing scaffold)  
**Goal:** Personal portfolio site for freelance software engineering work; also serves as the web presence required for Stripe account signup.

---

## Purpose & Scope

A single-page portfolio app. Public-facing portfolio at `/`. An `/admin` route is stubbed and auth-guarded from day one — the admin portal (Stripe integration, content management) is a future project that will live in the same app.

**Out of scope:** Stripe integration, backend API, authentication implementation, animations, interactive skills graph (all noted as future additions).

---

## Architecture

### Routing

React Router v6. Two routes:

| Route | Layout | Component | Notes |
|---|---|---|---|
| `/` | `PublicLayout` | `Home` | All portfolio sections |
| `/admin` | `AdminLayout` | `Admin` | Stub — auth guard redirects to `/` |

The nav uses anchor-scroll (`#hero`, `#about`, `#services`, `#work`, `#contact`). No additional routes for portfolio sections.

### Directory Structure

```
src/
  data/
    projects.ts       # Work/Projects data — plain array, API-swappable
    services.ts       # Services data — plain array
    skills.ts         # Skills with category + proficiency — used in Hero and future skills graph
  components/
    sections/         # Hero, About, Services, Work, Contact
    ui/               # Shared: Button, SectionHeading, NavBar, etc.
  layouts/
    PublicLayout.tsx  # Fixed nav + footer wrapping Home
    AdminLayout.tsx   # Stub, secured
  pages/
    Home.tsx          # Renders all sections in scroll order
    Admin.tsx         # Stub placeholder
  App.tsx             # Router setup
  main.tsx            # Entry point
```

---

## Sections

All sections follow a consistent rhythm: monospace `SectionHeading` (small uppercase label + title) above the section content.

### Hero
- Name, title: "Software Engineer & Solution Architect"
- Skill tags sourced from `src/data/skills.ts` — rendered as pills with optional category/level context on hover or as a subtle badge
- Two CTAs: **Get in touch** (scrolls to `#contact`) and **View work** (scrolls to `#work`)

### About
- Two-column desktop / stacked mobile. Two columns on desktop uses horizontal space well and lets a visitor scan the "what I bring" highlights without reading a full paragraph — easy to collapse to single column if it doesn't feel right once built.
- Left: short personal bio (consulting background, what you do)
- Right: headline stats or "what I bring" bullet list

### Services
- Card grid sourced from `src/data/services.ts`
- Each card: title, short description, icon

### Work / Projects
- Card grid sourced from `src/data/projects.ts`
- No real client names — engagement-style descriptions ("Led architecture for a payments platform...")
- Future: optional image shown if present

### Contact
- Two-column desktop / stacked mobile
- Left: EmailJS contact form (name, email, message fields)
- Right: social links — LinkedIn, GitHub, mailto

### Nav
- Fixed top bar
- Logo / name left, anchor links right
- Hamburger menu on mobile

---

## Data Interfaces

```ts
// src/data/projects.ts
interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image?: string   // optional — display when present
  link?: string    // optional — external link
}

// src/data/services.ts
interface Service {
  id: string
  title: string
  description: string
  icon: string  // emoji or Heroicons component name — resolved during build
}

// src/data/skills.ts
type SkillCategory = 'frontend' | 'backend' | 'architecture' | 'payments' | 'design' | 'other'
type SkillLevel = 'expert' | 'intermediate' | 'familiar'

interface Skill {
  id: string
  name: string
  category: SkillCategory
  level: SkillLevel
}
```

All files export a plain `const` array. Swapping to a backend API means replacing the import with a `fetch` call — no component changes needed. The `Skill` type is also the foundation for the future interactive skills graph.

---

## Visual System

| Token | Value |
|---|---|
| Background | `#f9f9f7` |
| Text | `#0f0f0f` |
| Headings / labels | Monospace — JetBrains Mono or IBM Plex Mono (Google Fonts) |
| Body copy | System sans-serif |
| Accent | Single dark tone (finalised during build) |

Tailwind CSS with a small `tailwind.config` extension for the custom font and background colour. No component library — hand-crafted to preserve the aesthetic.

---

## Environment & Config

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

EmailJS called directly from the Contact component. Keys in `.env` (already gitignored via `*.local` or explicit `.env` entry).

---

## Future Hooks (built in from day one)

- `projects.ts`, `services.ts`, and `skills.ts` are plain arrays — easy API swap later
- `/admin` route + `AdminLayout` stubbed, not linked from public nav
- `image?` field on `Project` ready for when project cards get image support
- Interactive skills graph noted — `skills.ts` data structure is already designed to support it (category + level fields)
