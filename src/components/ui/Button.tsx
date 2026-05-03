interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variantClass: Record<string, string> = {
  primary: 'bg-ink text-surface',
  secondary: 'border border-border text-muted',
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-mono text-sm px-5 py-2.5 rounded-sm transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ${variantClass[variant]}`}
    >
      {children}
    </button>
  )
}
