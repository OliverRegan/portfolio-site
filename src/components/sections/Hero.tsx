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
