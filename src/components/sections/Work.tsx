import SectionHeading from '../ui/SectionHeading'
import { projects } from '../../data/projects'

export default function Work() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="Notable work" title="Projects" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className="border rounded-sm p-6 flex flex-col"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-sm mb-4"
                />
              )}

              <h3 className="font-mono font-bold text-sm mb-2" style={{ color: 'var(--color-ink)' }}>
                {project.title}
              </h3>

              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-muted)' }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-xs border px-2 py-0.5 rounded-full"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs mt-4 hover:underline"
                  style={{ color: 'var(--color-accent)' }}
                >
                  View →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
