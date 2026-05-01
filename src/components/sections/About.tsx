import SectionHeading from '../ui/SectionHeading'

const HIGHLIGHTS = [
  'Full-stack delivery across Angular, React & Java',
  'Stripe & payments platform specialist',
  'Architecture, solution design & technical leadership',
  'UI/UX design & stakeholder engagement',
  'Consulting across financial services & enterprise',
]

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="Background" title="About Me" />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-base leading-relaxed mb-4 text-ink">
              I'm a software engineer and consultant with experience delivering complex,
              high-stakes projects across financial services, insurance, and enterprise technology.
            </p>
            <p className="text-base leading-relaxed text-ink">
              I work across the full stack — from Angular and React frontends through to Java
              backends — with a particular focus on payments, architecture, and getting things
              shipped.
            </p>
          </div>

          <ul className="space-y-4">
            {HIGHLIGHTS.map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="font-mono mt-0.5 shrink-0 text-accent">→</span>
                <span className="text-sm text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
