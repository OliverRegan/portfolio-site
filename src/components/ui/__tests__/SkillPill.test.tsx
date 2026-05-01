import { render, screen } from '@testing-library/react'
import SkillPill from '../SkillPill'
import type { Skill } from '../../../data/skills'

describe('SkillPill', () => {
  const skill: Skill = { id: 'react', name: 'React', category: 'frontend', level: 'intermediate' }

  it('renders the skill name', () => {
    render(<SkillPill skill={skill} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('exposes category and level via title attribute', () => {
    render(<SkillPill skill={skill} />)
    expect(screen.getByTitle('frontend · intermediate')).toBeInTheDocument()
  })
})
