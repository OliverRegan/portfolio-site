import { projects } from '../projects'

describe('projects data', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('every project has required fields', () => {
    projects.forEach(project => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(Array.isArray(project.tags)).toBe(true)
      expect(project.tags.length).toBeGreaterThan(0)
    })
  })

  it('project ids are unique', () => {
    const ids = projects.map(p => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
