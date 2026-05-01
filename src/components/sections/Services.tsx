import SectionHeading from '../ui/SectionHeading'
import { services } from '../../data/services'

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="What I offer" title="Services" />

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map(service => (
            <div
              key={service.id}
              className="border rounded-sm p-6"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <span className="text-2xl mb-4 block">{service.icon}</span>
              <h3 className="font-mono font-bold text-sm mb-2" style={{ color: 'var(--color-ink)' }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
