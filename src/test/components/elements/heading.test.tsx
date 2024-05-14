import { render,screen } from '@testing-library/react';
import Heading from '../../../components/Elements/Headings/Heading';

describe('Heading component', () => {
  it('renders correctly with heading1 type', () => {
    render(<Heading text="Test Heading" type="heading1" />)
    const headingElement = screen.getByText('Test Heading')
    expect(headingElement.tagName).toBe('H1')
    expect(headingElement).toHaveClass('font-bold')
  })

  it('renders correctly with heading2 type', () => {
    render(<Heading text="Test Heading" type="heading2" />)
    const headingElement = screen.getByText('Test Heading')
    expect(headingElement.tagName).toBe('H2')
    expect(headingElement).toHaveClass('font-bold')
  })

  it('renders correctly with heading3 type', () => {
    render(<Heading text="Test Heading" type="heading3" />)
    const headingElement = screen.getByText('Test Heading')
    expect(headingElement.tagName).toBe('H3')
    expect(headingElement).toHaveClass('font-medium')
  })

  it('renders correctly with heading4 type', () => {
    render(<Heading text="Test Heading" type="heading4" />)
    const headingElement = screen.getByText('Test Heading')
    expect(headingElement.tagName).toBe('H4')
    expect(headingElement).toHaveClass('font-normal')
  })

  it('renders correctly with heading5 type', () => {
    render(<Heading text="Test Heading" type="heading5" />)
    const headingElement = screen.getByText('Test Heading')
    expect(headingElement.tagName).toBe('H5')
    expect(headingElement).toHaveClass('font-normal')
  })

  it('renders with custom className', () => {
     render(<Heading text="Test Heading" type="heading1" className="custom-class" />)
    const headingElement = screen.getByText('Test Heading')
    expect(headingElement).toHaveClass('custom-class')
  })
});
