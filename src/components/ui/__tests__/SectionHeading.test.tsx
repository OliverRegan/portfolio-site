import { render, screen } from '@testing-library/react'
import SectionHeading from '../SectionHeading'

describe('SectionHeading', () => {
  it('renders the label and title', () => {
    render(<SectionHeading label="My Label" title="My Title" />)
    expect(screen.getByText('My Label')).toBeInTheDocument()
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })
})
