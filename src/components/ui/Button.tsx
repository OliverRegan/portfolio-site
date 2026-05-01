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
