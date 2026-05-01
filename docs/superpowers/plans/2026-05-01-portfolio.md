# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio site with Hero, About, Services, Work, and Contact sections, stubbed `/admin` route, and data-driven content files.

**Architecture:** React Router v6 with two routes (`/` and `/admin`). All portfolio sections live on the Home page as anchor-scroll targets. Content (skills, services, projects) is stored in `src/data/` as typed arrays — swappable for API calls later. EmailJS handles the contact form client-side with no backend.

**Tech Stack:** React 19, TypeScript, Vite 7 + SWC, Tailwind CSS v4 (`@tailwindcss/vite`), React Router v6, `@emailjs/browser`, Vitest + React Testing Library.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Modify | Add deps: tailwindcss, @tailwindcss/vite, react-router-dom, @emailjs/browser, vitest, @testing-library/react, @testing-library/jest-dom, jsdom |
| `vite.config.ts` | Modify | Add Tailwind + Vitest config |
| `tsconfig.app.json` | Modify | Add vitest/globals to types |
| `index.html` | Modify | Add Google Fonts link |
| `src/index.css` | Modify | Tailwind import + CSS custom properties |
| `.env.example` | Create | EmailJS key placeholders |
| `.gitignore` | Modify | Add `.env` entry |
| `src/App.tsx` | Rewrite | React Router setup |
| `src/data/skills.ts` | Create | Skill type + data array |
| `src/data/services.ts` | Create | Service type + data array |
| `src/data/projects.ts` | Create | Project type + data array |
| `src/components/ui/SectionHeading.tsx` | Create | Monospace label + title heading |
| `src/components/ui/Button.tsx` | Create | Primary / secondary button variants |
| `src/components/ui/SkillPill.tsx` | Create | Skill tag with hover tooltip |
| `src/components/ui/NavBar.tsx` | Create | Fixed nav, anchor links, hamburger |
| `src/components/ui/Footer.tsx` | Create | Simple copyright footer |
| `src/layouts/PublicLayout.tsx` | Create | NavBar + Outlet + Footer |
| `src/layouts/AdminLayout.tsx` | Create | Auth guard stub (redirects to `/`) |
| `src/pages/Home.tsx` | Create | All sections in scroll order |
| `src/pages/Admin.tsx` | Create | Stub — renders null |
| `src/components/sections/Hero.tsx` | Create | Name, title, skill pills, CTAs |
| `src/components/sections/About.tsx` | Create | Bio + highlights two-column |
| `src/components/sections/Services.tsx` | Create | Card grid from services data |
| `src/components/sections/Work.tsx` | Create | Card grid from projects data |
| `src/components/sections/Contact.tsx` | Create | EmailJS form + social links |
| `src/test/setup.ts` | Create | Vitest + jest-dom setup |

---

## Task 1: Install dependencies & configure Tailwind v4

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Modify: `src/index.css`
- Modify: `index.html`
- Create: `.env.example`
- Modify: `.gitignore`

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install tailwindcss @tailwindcss/vite react-router-dom @emailjs/browser
```

- [ ] **Step 2: Install dev dependencies**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/coverage-v8
```

- [ ] **Step 3: Update `vite.config.ts`**

Tailwind v4 uses a Vite plugin — no `tailwind.config.js` needed. Vitest config lives alongside Vite config.

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

- [ ] **Step 4: Replace `src/index.css` with Tailwind import + design tokens**

Tailwind v4 activates with a single `@import`. CSS custom properties on `:root` define the design tokens — used throughout components via `[var(--token)]` arbitrary-value syntax.

```css
@import "tailwindcss";

:root {
  --color-bg: #f9f9f7;
  --color-ink: #0f0f0f;
  --color-accent: #1e293b;
  --color-muted: #6b7280;
  --color-border: #e5e5e3;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
}
```

- [ ] **Step 5: Add Google Fonts to `index.html`**

Insert before the closing `</head>` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
```

- [ ] **Step 6: Create `.env.example`**

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

- [ ] **Step 7: Add `.env` to `.gitignore`**

Add after the `*.local` line:

```
.env
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts at `http://localhost:5173` with no errors in the terminal.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/index.css index.html .env.example .gitignore
git commit -m "feat: install deps, configure Tailwind v4 and Vitest"
```

---

## Task 2: Configure Vitest & test setup

**Files:**
- Create: `src/test/setup.ts`
- Modify: `tsconfig.app.json`
- Modify: `package.json`

- [ ] **Step 1: Create `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 2: Add vitest globals to `tsconfig.app.json`**

The file already has `"types": ["vite/client"]`. Replace that line with:

```json
"types": ["vite/client", "vitest/globals"]
```

- [ ] **Step 3: Add test scripts to `package.json`**

Inside `"scripts"`, add:

```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 4: Write a smoke test to confirm the setup**

Create `src/test/setup.test.ts`:

```ts
describe('vitest setup', () => {
  it('runs', () => {
    expect(true).toBe(true)
  })
})
```

- [ ] **Step 5: Run the smoke test**

```bash
npm run test:run
```

Expected output:
```
✓ src/test/setup.test.ts (1)
Test Files  1 passed (1)
```

- [ ] **Step 6: Commit**

```bash
git add src/test/setup.ts src/test/setup.test.ts tsconfig.app.json package.json package-lock.json
git commit -m "feat: configure Vitest with React Testing Library"
```

---

## Task 3: Create data files

**Files:**
- Create: `src/data/skills.ts`
- Create: `src/data/services.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/__tests__/skills.test.ts`
- Create: `src/data/__tests__/services.test.ts`
- Create: `src/data/__tests__/projects.test.ts`

- [ ] **Step 1: Write failing tests for `skills.ts`**

Create `src/data/__tests__/skills.test.ts`:

```ts
import { skills } from '../skills'
import type { SkillCategory, SkillLevel } from '../skills'

const validCategories: SkillCategory[] = ['frontend', 'backend', 'architecture', 'payments', 'design', 'other']
const validLevels: SkillLevel[] = ['expert', 'intermediate', 'familiar']

describe('skills data', () => {
  it('has at least one skill', () => {
    expect(skills.length).toBeGreaterThan(0)
  })

  it('every skill has required fields with valid values', () => {
    skills.forEach(skill => {
      expect(skill.id).toBeTruthy()
      expect(skill.name).toBeTruthy()
      expect(validCategories).toContain(skill.category)
      expect(validLevels).toContain(skill.level)
    })
  })

  it('skill ids are unique', () => {
    const ids = skills.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

- [ ] **Step 2: Write failing tests for `services.ts`**

Create `src/data/__tests__/services.test.ts`:

```ts
import { services } from '../services'

describe('services data', () => {
  it('has at least one service', () => {
    expect(services.length).toBeGreaterThan(0)
  })

  it('every service has required fields', () => {
    services.forEach(service => {
      expect(service.id).toBeTruthy()
      expect(service.title).toBeTruthy()
      expect(service.description).toBeTruthy()
      expect(service.icon).toBeTruthy()
    })
  })

  it('service ids are unique', () => {
    const ids = services.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

- [ ] **Step 3: Write failing tests for `projects.ts`**

Create `src/data/__tests__/projects.test.ts`:

```ts
import { projects } from '../projects'

describe('projects data', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('every project has required fields', () => {
    projects.forEach(project => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(Array.isArray(project.tags)).toBe(true)
      expect(project.tags.length).toBeGreaterThan(0)
    })
  })

  it('project ids are unique', () => {
    const ids = projects.map(p => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

- [ ] **Step 4: Run tests — confirm they fail**

```bash
npm run test:run
```

Expected: 3 test files fail with "Cannot find module" errors.

- [ ] **Step 5: Create `src/data/skills.ts`**

```ts
export type SkillCategory = 'frontend' | 'backend' | 'architecture' | 'payments' | 'design' | 'other'
export type SkillLevel = 'expert' | 'intermediate' | 'familiar'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  level: SkillLevel
}

export const skills: Skill[] = [
  { id: 'angular', name: 'Angular', category: 'frontend', level: 'expert' },
  { id: 'react', name: 'React', category: 'frontend', level: 'intermediate' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'expert' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', level: 'expert' },
  { id: 'css', name: 'CSS / SCSS', category: 'frontend', level: 'expert' },
  { id: 'java', name: 'Java', category: 'backend', level: 'expert' },
  { id: 'stripe', name: 'Stripe', category: 'payments', level: 'expert' },
  { id: 'architecture', name: 'Solution Architecture', category: 'architecture', level: 'expert' },
  { id: 'system-design', name: 'System Design', category: 'architecture', level: 'expert' },
  { id: 'uiux', name: 'UI / UX', category: 'design', level: 'intermediate' },
  { id: 'stakeholder', name: 'Stakeholder Engagement', category: 'other', level: 'expert' },
]
```

- [ ] **Step 6: Create `src/data/services.ts`**

```ts
export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description: 'End-to-end feature delivery across Angular, React, and Java backends. From greenfield builds to legacy modernisation.',
    icon: '⚙️',
  },
  {
    id: 'architecture',
    title: 'Architecture & Solution Design',
    description: 'Technical architecture, system design, and solution blueprinting. Turning business requirements into scalable, deliverable systems.',
    icon: '🏗️',
  },
  {
    id: 'payments',
    title: 'Payments Integration',
    description: 'Stripe integration and payments platform design. From simple checkout flows to complex multi-party payment architectures.',
    icon: '💳',
  },
  {
    id: 'uiux',
    title: 'UI/UX & Stakeholder Engagement',
    description: 'Interface design, user experience consulting, and bridging the gap between technical teams and business stakeholders.',
    icon: '🎨',
  },
]
```

- [ ] **Step 7: Create `src/data/projects.ts`**

```ts
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image?: string
  link?: string
}

export const projects: Project[] = [
  {
    id: 'payments-platform',
    title: 'Payments Platform Architecture',
    description: 'Led end-to-end architecture and delivery of a Stripe-based payments platform for a financial services client. Designed multi-party payment flows, reconciliation pipelines, and compliance controls.',
    tags: ['Stripe', 'Java', 'Architecture', 'Payments'],
  },
  {
    id: 'angular-portal',
    title: 'Enterprise Client Portal',
    description: 'Architected and delivered a large-scale Angular portal for a consulting engagement. Introduced component architecture standards, a design system, and CI/CD pipelines.',
    tags: ['Angular', 'TypeScript', 'UI/UX', 'Consulting'],
  },
  {
    id: 'solution-design',
    title: 'Solution Design — Insurance Platform',
    description: 'Led solution design for a greenfield insurance platform. Produced architecture diagrams, technical specifications, and facilitated stakeholder workshops to align business and engineering teams.',
    tags: ['Architecture', 'Solution Design', 'Stakeholder Engagement'],
  },
]
```

- [ ] **Step 8: Run tests — confirm they pass**

```bash
npm run test:run
```

Expected:
```
✓ src/data/__tests__/skills.test.ts (3)
✓ src/data/__tests__/services.test.ts (3)
✓ src/data/__tests__/projects.test.ts (3)
Test Files  4 passed (4)
```

- [ ] **Step 9: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data files for skills, services, and projects"
```

---

## Task 4: Build shared UI components

**Files:**
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SkillPill.tsx`
- Create: `src/components/ui/__tests__/SectionHeading.test.tsx`
- Create: `src/components/ui/__tests__/Button.test.tsx`
- Create: `src/components/ui/__tests__/SkillPill.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/ui/__tests__/SectionHeading.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import SectionHeading from '../SectionHeading'

describe('SectionHeading', () => {
  it('renders the label and title', () => {
    render(<SectionHeading label="My Label" title="My Title" />)
    expect(screen.getByText('My Label')).toBeInTheDocument()
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })
})
```

Create `src/components/ui/__tests__/Button.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

Create `src/components/ui/__tests__/SkillPill.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import SkillPill from '../SkillPill'
import type { Skill } from '../../../data/skills'

describe('SkillPill', () => {
  const skill: Skill = { id: 'react', name: 'React', category: 'frontend', level: 'intermediate' }

  it('renders the skill name', () => {
    render(<SkillPill skill={skill} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('exposes category and level via title attribute', () => {
    render(<SkillPill skill={skill} />)
    expect(screen.getByTitle('frontend · intermediate')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm run test:run
```

Expected: 3 new test files fail with "Cannot find module" errors.

- [ ] **Step 3: Create `src/components/ui/SectionHeading.tsx`**

```tsx
interface SectionHeadingProps {
  label: string
  title: string
}

export default function SectionHeading({ label, title }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>
        {label}
      </p>
      <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}>
        {title}
      </h2>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/ui/Button.tsx`**

```tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
}: ButtonProps) {
  const base = 'font-mono text-sm px-5 py-2.5 rounded-sm transition-opacity disabled:opacity-50 cursor-pointer'
  const styles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)' },
    secondary: { border: '1px solid var(--color-border)', color: 'var(--color-muted)' },
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base} style={styles[variant]}>
      {children}
    </button>
  )
}
```

- [ ] **Step 5: Create `src/components/ui/SkillPill.tsx`**

```tsx
import type { Skill } from '../../data/skills'

const levelStyle: Record<Skill['level'], React.CSSProperties> = {
  expert: { backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)' },
  intermediate: { border: '1px solid var(--color-ink)', color: 'var(--color-ink)' },
  familiar: { border: '1px solid var(--color-border)', color: 'var(--color-muted)' },
}

export default function SkillPill({ skill }: { skill: Skill }) {
  return (
    <span
      title={`${skill.category} · ${skill.level}`}
      className="inline-block font-mono text-xs px-3 py-1 rounded-full cursor-default"
      style={levelStyle[skill.level]}
    >
      {skill.name}
    </span>
  )
}
```

- [ ] **Step 6: Run tests — confirm they pass**

```bash
npm run test:run
```

Expected:
```
✓ src/components/ui/__tests__/SectionHeading.test.tsx (1)
✓ src/components/ui/__tests__/Button.test.tsx (3)
✓ src/components/ui/__tests__/SkillPill.test.tsx (2)
Test Files  7 passed (7)
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add SectionHeading, Button, and SkillPill UI components"
```

---

## Task 5: Set up routing skeleton

**Files:**
- Create: `src/pages/Home.tsx`
- Create: `src/pages/Admin.tsx`
- Create: `src/layouts/PublicLayout.tsx`
- Create: `src/layouts/AdminLayout.tsx`
- Rewrite: `src/App.tsx`

- [ ] **Step 1: Create `src/pages/Home.tsx`** (stub)

```tsx
export default function Home() {
  return <div data-testid="home-page">Home</div>
}
```

- [ ] **Step 2: Create `src/pages/Admin.tsx`** (stub)

```tsx
export default function Admin() {
  return null
}
```

- [ ] **Step 3: Create `src/layouts/PublicLayout.tsx`** (stub — full version in Task 6)

```tsx
import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/layouts/AdminLayout.tsx`**

The auth guard is a stub — it always redirects to `/`. Replace the `Navigate` call with a real auth check when the admin portal is built.

```tsx
import { Navigate } from 'react-router-dom'

export default function AdminLayout() {
  return <Navigate to="/" replace />
}
```

- [ ] **Step 5: Rewrite `src/App.tsx`**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 6: Verify routing in the browser**

```bash
npm run dev
```

- Open `http://localhost:5173/` — should render "Home"
- Open `http://localhost:5173/admin` — should redirect to `/` and render "Home"

- [ ] **Step 7: Commit**

```bash
git add src/pages/ src/layouts/ src/App.tsx
git commit -m "feat: set up React Router with public and stubbed admin routes"
```

---

## Task 6: Build NavBar & wire PublicLayout

**Files:**
- Create: `src/components/ui/NavBar.tsx`
- Create: `src/components/ui/Footer.tsx`
- Create: `src/components/ui/__tests__/NavBar.test.tsx`
- Modify: `src/layouts/PublicLayout.tsx`

- [ ] **Step 1: Write failing NavBar tests**

Create `src/components/ui/__tests__/NavBar.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import NavBar from '../NavBar'

describe('NavBar', () => {
  it('renders all navigation links', () => {
    render(<NavBar />)
    expect(screen.getAllByText(/about/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/services/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/work/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/contact/i).length).toBeGreaterThan(0)
  })

  it('renders site name', () => {
    render(<NavBar />)
    expect(screen.getByText('Ollie Regan')).toBeInTheDocument()
  })

  it('toggles mobile menu open and closed', () => {
    render(<NavBar />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    expect(screen.getByText('Menu')).toBeInTheDocument()
    fireEvent.click(toggle)
    expect(screen.getByText('Close')).toBeInTheDocument()
    fireEvent.click(toggle)
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm run test:run
```

Expected: fails with "Cannot find module '../NavBar'".

- [ ] **Step 3: Create `src/components/ui/NavBar.tsx`**

```tsx
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
    >
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#hero"
          className="font-mono font-bold text-sm tracking-tight"
          style={{ color: 'var(--color-ink)' }}
        >
          Ollie Regan
        </a>

        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest transition-colors hover:opacity-100"
                style={{ color: 'var(--color-muted)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden font-mono text-xs uppercase tracking-widest"
          style={{ color: 'var(--color-muted)' }}
          onClick={() => setOpen(o => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <ul
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
        >
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: 'var(--color-muted)' }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
```

- [ ] **Step 4: Create `src/components/ui/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="border-t py-8 mt-24" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
          © {new Date().getFullYear()} Ollie Regan
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Update `src/layouts/PublicLayout.tsx`**

```tsx
import { Outlet } from 'react-router-dom'
import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <NavBar />
      <main className="pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 6: Run tests — confirm they pass**

```bash
npm run test:run
```

Expected:
```
✓ src/components/ui/__tests__/NavBar.test.tsx (3)
Test Files  8 passed (8)
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/NavBar.tsx src/components/ui/Footer.tsx src/components/ui/__tests__/NavBar.test.tsx src/layouts/PublicLayout.tsx
git commit -m "feat: add NavBar, Footer, and wire PublicLayout"
```

---

## Task 7: Build Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/__tests__/Hero.test.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Write failing Hero tests**

Create `src/components/sections/__tests__/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders name and title', () => {
    render(<Hero />)
    expect(screen.getByText('Ollie Regan')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Software Engineer')
  })

  it('renders both CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
    expect(screen.getByText('View work')).toBeInTheDocument()
  })

  it('renders a skill pill for each skill', () => {
    render(<Hero />)
    expect(screen.getByText('Angular')).toBeInTheDocument()
    expect(screen.getByText('Stripe')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm run test:run
```

Expected: fails with "Cannot find module '../Hero'".

- [ ] **Step 3: Create `src/components/sections/Hero.tsx`**

```tsx
import { skills } from '../../data/skills'
import Button from '../ui/Button'
import SkillPill from '../ui/SkillPill'

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <p
          className="font-mono text-xs uppercase tracking-widest mb-4"
          style={{ color: 'var(--color-muted)' }}
        >
          Ollie Regan
        </p>

        <h1
          className="font-bold text-5xl md:text-6xl leading-tight mb-6"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}
        >
          Software Engineer
          <br />
          <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>
            &amp; Solution Architect
          </span>
        </h1>

        <div className="flex flex-wrap gap-2 mb-10">
          {skills.map(skill => (
            <SkillPill key={skill.id} skill={skill} />
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => scrollTo('contact')}>Get in touch</Button>
          <Button variant="secondary" onClick={() => scrollTo('work')}>
            View work
          </Button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm run test:run
```

Expected:
```
✓ src/components/sections/__tests__/Hero.test.tsx (3)
Test Files  9 passed (9)
```

- [ ] **Step 5: Add Hero to `src/pages/Home.tsx`**

```tsx
import Hero from '../components/sections/Hero'

export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}
```

- [ ] **Step 6: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:5173` — Hero section should be visible with skill pills, name, title, and CTA buttons.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/sections/__tests__/Hero.test.tsx src/pages/Home.tsx
git commit -m "feat: add Hero section"
```

---

## Task 8: Build About section

**Files:**
- Create: `src/components/sections/About.tsx`
- Create: `src/components/sections/__tests__/About.test.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Write failing About tests**

Create `src/components/sections/__tests__/About.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import About from '../About'

describe('About', () => {
  it('renders the section heading', () => {
    render(<About />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('renders the bio paragraph', () => {
    render(<About />)
    expect(screen.getByText(/software engineer and consultant/i)).toBeInTheDocument()
  })

  it('renders the highlights list', () => {
    render(<About />)
    expect(screen.getByText(/stripe/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm run test:run
```

Expected: fails with "Cannot find module '../About'".

- [ ] **Step 3: Create `src/components/sections/About.tsx`**

```tsx
import SectionHeading from '../ui/SectionHeading'

const HIGHLIGHTS = [
  'Full-stack delivery across Angular, React & Java',
  'Stripe & payments platform specialist',
  'Architecture, solution design & technical leadership',
  'UI/UX design & stakeholder engagement',
  'Consulting across financial services & enterprise',
]

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="Background" title="About Me" />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: 'var(--color-ink)' }}
            >
              I'm a software engineer and consultant with experience delivering
              complex, high-stakes projects across financial services, insurance,
              and enterprise technology.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-ink)' }}>
              I work across the full stack — from Angular and React frontends through
              to Java backends — with a particular focus on payments, architecture,
              and getting things shipped.
            </p>
          </div>

          <ul className="space-y-4">
            {HIGHLIGHTS.map(item => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="font-mono mt-0.5 shrink-0"
                  style={{ color: 'var(--color-accent)' }}
                >
                  →
                </span>
                <span className="text-sm" style={{ color: 'var(--color-ink)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm run test:run
```

Expected:
```
✓ src/components/sections/__tests__/About.test.tsx (3)
Test Files  10 passed (10)
```

- [ ] **Step 5: Add About to `src/pages/Home.tsx`**

```tsx
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
    </>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/About.tsx src/components/sections/__tests__/About.test.tsx src/pages/Home.tsx
git commit -m "feat: add About section"
```

---

## Task 9: Build Services section

**Files:**
- Create: `src/components/sections/Services.tsx`
- Create: `src/components/sections/__tests__/Services.test.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Write failing Services tests**

Create `src/components/sections/__tests__/Services.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Services from '../Services'
import { services } from '../../../data/services'

describe('Services', () => {
  it('renders the section heading', () => {
    render(<Services />)
    expect(screen.getByText('Services')).toBeInTheDocument()
  })

  it('renders a card for each service', () => {
    render(<Services />)
    services.forEach(service => {
      expect(screen.getByText(service.title)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm run test:run
```

Expected: fails with "Cannot find module '../Services'".

- [ ] **Step 3: Create `src/components/sections/Services.tsx`**

```tsx
import SectionHeading from '../ui/SectionHeading'
import { services } from '../../data/services'

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="What I offer" title="Services" />

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map(service => (
            <div
              key={service.id}
              className="border rounded-sm p-6"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <span className="text-2xl mb-4 block">{service.icon}</span>
              <h3
                className="font-mono font-bold text-sm mb-2"
                style={{ color: 'var(--color-ink)' }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm run test:run
```

Expected:
```
✓ src/components/sections/__tests__/Services.test.tsx (2)
Test Files  11 passed (11)
```

- [ ] **Step 5: Add Services to `src/pages/Home.tsx`**

```tsx
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Services from '../components/sections/Services'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
    </>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Services.tsx src/components/sections/__tests__/Services.test.tsx src/pages/Home.tsx
git commit -m "feat: add Services section"
```

---

## Task 10: Build Work section

**Files:**
- Create: `src/components/sections/Work.tsx`
- Create: `src/components/sections/__tests__/Work.test.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Write failing Work tests**

Create `src/components/sections/__tests__/Work.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Work from '../Work'
import { projects } from '../../../data/projects'

describe('Work', () => {
  it('renders the section heading', () => {
    render(<Work />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders a card for each project', () => {
    render(<Work />)
    projects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    })
  })

  it('renders tags for each project', () => {
    render(<Work />)
    expect(screen.getByText('Stripe')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm run test:run
```

Expected: fails with "Cannot find module '../Work'".

- [ ] **Step 3: Create `src/components/sections/Work.tsx`**

```tsx
import SectionHeading from '../ui/SectionHeading'
import { projects } from '../../data/projects'

export default function Work() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="Notable work" title="Projects" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className="border rounded-sm p-6 flex flex-col"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-sm mb-4"
                />
              )}

              <h3
                className="font-mono font-bold text-sm mb-2"
                style={{ color: 'var(--color-ink)' }}
              >
                {project.title}
              </h3>

              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-muted)' }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-xs border px-2 py-0.5 rounded-full"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs mt-4 hover:underline"
                  style={{ color: 'var(--color-accent)' }}
                >
                  View →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm run test:run
```

Expected:
```
✓ src/components/sections/__tests__/Work.test.tsx (3)
Test Files  12 passed (12)
```

- [ ] **Step 5: Add Work to `src/pages/Home.tsx`**

```tsx
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import Work from '../components/sections/Work'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Work />
    </>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Work.tsx src/components/sections/__tests__/Work.test.tsx src/pages/Home.tsx
git commit -m "feat: add Work/Projects section"
```

---

## Task 11: Build Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/components/sections/__tests__/Contact.test.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Write failing Contact tests**

Create `src/components/sections/__tests__/Contact.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Contact from '../Contact'

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument()
  })

  it('renders the send button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Contact />)
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm run test:run
```

Expected: fails with "Cannot find module '../Contact'".

- [ ] **Step 3: Create `src/components/sections/Contact.tsx`**

**Before writing this file:** Create a `.env` file in the project root with your actual EmailJS values. Without these, the form will fail at runtime (not at build time).

```
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

**Also update the LinkedIn and GitHub URLs** in the `SOCIALS` array below with your real handles.

```tsx
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/your-handle',
    display: 'linkedin.com/in/your-handle',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/your-handle',
    display: 'github.com/your-handle',
  },
  {
    label: 'Email',
    href: 'mailto:ollieregan1@gmail.com',
    display: 'ollieregan1@gmail.com',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'font-mono text-sm px-4 py-2.5 rounded-sm outline-none transition-colors w-full'
  const inputStyle: React.CSSProperties = {
    border: '1px solid var(--color-border)',
    background: 'transparent',
    color: 'var(--color-ink)',
  }

  return (
    <section id="contact" className="py-24" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="Get in touch" title="Contact" />

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className={inputClass}
              style={inputStyle}
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className={inputClass}
              style={inputStyle}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={5}
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />
            <Button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </Button>
            {status === 'sent' && (
              <p className="font-mono text-xs" style={{ color: '#16a34a' }}>
                Message sent!
              </p>
            )}
            {status === 'error' && (
              <p className="font-mono text-xs" style={{ color: '#dc2626' }}>
                Something went wrong — try emailing directly.
              </p>
            )}
          </form>

          <div className="flex flex-col gap-6 justify-center">
            {SOCIALS.map(social => (
              <div key={social.label}>
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-1"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {social.label}
                </p>
                <a
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="font-mono text-sm hover:underline"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {social.display}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm run test:run
```

Expected:
```
✓ src/components/sections/__tests__/Contact.test.tsx (4)
Test Files  13 passed (13)
```

- [ ] **Step 5: Add Contact to `src/pages/Home.tsx`**

```tsx
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import Work from '../components/sections/Work'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Work />
      <Contact />
    </>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/sections/__tests__/Contact.test.tsx src/pages/Home.tsx
git commit -m "feat: add Contact section with EmailJS form and social links"
```

---

## Task 12: Final cleanup

**Files:**
- Modify: `.gitignore`
- Modify: `CLAUDE.md`
- Delete: `src/App.css` (default Vite file, no longer needed)
- Delete: `src/assets/react.svg` (default Vite asset, no longer needed)

- [ ] **Step 1: Remove default Vite files**

```bash
rm src/App.css src/assets/react.svg
```

- [ ] **Step 2: Add `.superpowers/` to `.gitignore`**

Add after the `.claude/` line:

```
.superpowers/
```

- [ ] **Step 3: Update `CLAUDE.md` with test commands**

Add to the Commands section:

```markdown
npm run test        # Run Vitest in watch mode
npm run test:run    # Single test run (CI-friendly)
```

- [ ] **Step 4: Run full test suite**

```bash
npm run test:run
```

Expected: all 13 test files pass, 0 failures.

- [ ] **Step 5: Run the build**

```bash
npm run build
```

Expected: build completes with no TypeScript errors.

- [ ] **Step 6: Smoke test in the browser**

```bash
npm run dev
```

Walk through the page:
- Hero renders with skill pills and CTA buttons
- "Get in touch" scrolls to Contact section
- "View work" scrolls to Work section
- Nav links scroll to correct sections
- Nav hamburger opens/closes on a narrow viewport
- Services shows 4 cards
- Work shows 3 project cards
- Contact form is present with 3 fields and submit button
- Footer shows copyright year

- [ ] **Step 7: Final commit**

```bash
git add .gitignore CLAUDE.md
git rm src/App.css src/assets/react.svg
git commit -m "chore: remove default Vite files, update gitignore and CLAUDE.md"
```
