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
