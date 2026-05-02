import type { Skill } from '../../data/skills'

const levelClass: Record<Skill['level'], string> = {
  expert: 'bg-ink text-surface',
  intermediate: 'border border-ink text-ink',
  familiar: 'border border-border text-muted',
}

export default function SkillPill({ skill }: { skill: Skill }) {
  return (
    <span className="relative group inline-block">
      <span
        className={`inline-block font-mono text-xs px-3 py-1 rounded-full cursor-default ${levelClass[skill.level]}`}
      >
        {skill.name}
      </span>

      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <span className="bg-ink text-surface font-mono text-xs px-2.5 py-1.5 rounded-sm whitespace-nowrap">
          {skill.category} · {skill.level}
        </span>
        <span className="border-4 border-transparent border-t-ink" />
      </span>
    </span>
  )
}
