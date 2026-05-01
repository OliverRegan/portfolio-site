export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image?: string
  link?: string
}

export const projects: Project[] = [
  {
    id: 'payments-platform',
    title: 'Payments Platform Architecture',
    description: 'Led end-to-end architecture and delivery of a Stripe-based payments platform for a financial services client. Designed multi-party payment flows, reconciliation pipelines, and compliance controls.',
    tags: ['Stripe', 'Java', 'Architecture', 'Payments'],
  },
  {
    id: 'angular-portal',
    title: 'Enterprise Client Portal',
    description: 'Architected and delivered a large-scale Angular portal for a consulting engagement. Introduced component architecture standards, a design system, and CI/CD pipelines.',
    tags: ['Angular', 'TypeScript', 'UI/UX', 'Consulting'],
  },
  {
    id: 'solution-design',
    title: 'Solution Design — Insurance Platform',
    description: 'Led solution design for a greenfield insurance platform. Produced architecture diagrams, technical specifications, and facilitated stakeholder workshops to align business and engineering teams.',
    tags: ['Architecture', 'Solution Design', 'Stakeholder Engagement'],
  },
]
