export type SkillCategory = 'frontend' | 'backend' | 'architecture' | 'payments' | 'design' | 'other'
export type SkillLevel = 'expert' | 'intermediate' | 'familiar'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  level: SkillLevel
}

export const skills: Skill[] = [
  { id: 'angular', name: 'Angular', category: 'frontend', level: 'expert' },
  { id: 'react', name: 'React', category: 'frontend', level: 'intermediate' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'expert' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', level: 'expert' },
  { id: 'css', name: 'CSS / SCSS', category: 'frontend', level: 'expert' },
  { id: 'java', name: 'Java', category: 'backend', level: 'expert' },
  { id: 'stripe', name: 'Stripe', category: 'payments', level: 'expert' },
  { id: 'architecture', name: 'Solution Architecture', category: 'architecture', level: 'expert' },
  { id: 'system-design', name: 'System Design', category: 'architecture', level: 'expert' },
  { id: 'uiux', name: 'UI / UX', category: 'design', level: 'intermediate' },
  { id: 'stakeholder', name: 'Stakeholder Engagement', category: 'other', level: 'expert' },
]
