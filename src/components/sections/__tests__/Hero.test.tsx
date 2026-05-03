import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders name and title', () => {
    render(<Hero />)
    expect(screen.getByText('Oliver Regan')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Software Engineer')
  })

  it('renders both CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
    expect(screen.getByText('View work')).toBeInTheDocument()
  })

  it('renders a skill pill for each skill', () => {
    render(<Hero />)
    expect(screen.getByText('Angular')).toBeInTheDocument()
    expect(screen.getByText('Stripe')).toBeInTheDocument()
  })
})
