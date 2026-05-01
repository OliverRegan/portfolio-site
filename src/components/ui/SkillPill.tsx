import type { Skill } from '../../data/skills'

const levelClass: Record<Skill['level'], string> = {
  expert: 'bg-ink text-surface',
  intermediate: 'border border-ink text-ink',
  familiar: 'border border-border text-muted',
}

export default function SkillPill({ skill }: { skill: Skill }) {
  return (
    <span
      title={`${skill.category} · ${skill.level}`}
      className={`inline-block font-mono text-xs px-3 py-1 rounded-full cursor-default ${levelClass[skill.level]}`}
    >
      {skill.name}
    </span>
  )
}
