import { skills } from '../skills'
import type { SkillCategory, SkillLevel } from '../skills'

const validCategories: SkillCategory[] = ['frontend', 'backend', 'architecture', 'payments', 'design', 'other']
const validLevels: SkillLevel[] = ['expert', 'intermediate', 'familiar']

describe('skills data', () => {
  it('has at least one skill', () => {
    expect(skills.length).toBeGreaterThan(0)
  })

  it('every skill has required fields with valid values', () => {
    skills.forEach(skill => {
      expect(skill.id).toBeTruthy()
      expect(skill.name).toBeTruthy()
      expect(validCategories).toContain(skill.category)
      expect(validLevels).toContain(skill.level)
    })
  })

  it('skill ids are unique', () => {
    const ids = skills.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
