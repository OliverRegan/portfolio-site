import { Code2, Boxes, CreditCard, Palette, type LucideIcon } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { services } from '../../data/services'

const ICONS: Record<string, LucideIcon> = {
  fullstack: Code2,
  architecture: Boxes,
  payments: CreditCard,
  uiux: Palette,
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white/50">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="What I offer" title="Services" />

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map(service => {
            const Icon = ICONS[service.id]
            return (
              <div key={service.id} className="border border-border rounded-sm p-6">
                {Icon && <Icon size={24} className="mb-4 text-accent" />}
                <h3 className="font-mono font-bold text-sm mb-2 text-ink">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
