export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Oliver Regan
        </p>
      </div>
    </footer>
  )
}
