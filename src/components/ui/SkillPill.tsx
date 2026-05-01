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
