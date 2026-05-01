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
