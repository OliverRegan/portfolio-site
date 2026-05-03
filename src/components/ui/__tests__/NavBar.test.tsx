import { render, screen, fireEvent } from '@testing-library/react'
import NavBar from '../NavBar'

describe('NavBar', () => {
  it('renders all navigation links', () => {
    render(<NavBar />)
    expect(screen.getAllByText(/about/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/services/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/work/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/contact/i).length).toBeGreaterThan(0)
  })

  it('renders site name', () => {
    render(<NavBar />)
    expect(screen.getByText('Oliver Regan')).toBeInTheDocument()
  })

  it('toggles mobile menu open and closed', () => {
    render(<NavBar />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    expect(screen.getByText('Menu')).toBeInTheDocument()
    fireEvent.click(toggle)
    expect(screen.getByText('Close')).toBeInTheDocument()
    fireEvent.click(toggle)
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })
})
