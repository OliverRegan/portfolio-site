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
