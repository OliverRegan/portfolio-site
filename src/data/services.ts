export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description: 'End-to-end feature delivery across Angular, React, and Java backends. From greenfield builds to legacy modernisation.',
    icon: '⚙️',
  },
  {
    id: 'architecture',
    title: 'Architecture & Solution Design',
    description: 'Technical architecture, system design, and solution blueprinting. Turning business requirements into scalable, deliverable systems.',
    icon: '🏗️',
  },
  {
    id: 'payments',
    title: 'Payments Integration',
    description: 'Stripe integration and payments platform design. From simple checkout flows to complex multi-party payment architectures.',
    icon: '💳',
  },
  {
    id: 'uiux',
    title: 'UI/UX & Stakeholder Engagement',
    description: 'Interface design, user experience consulting, and bridging the gap between technical teams and business stakeholders.',
    icon: '🎨',
  },
]
