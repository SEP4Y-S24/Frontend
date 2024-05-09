import { render, fireEvent,screen } from '@testing-library/react'
import Dropdown from '../../../components/Form/selectForm'

describe('Dropdown', () => {
  const options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ]

  

  const props = {
    dropdownLabel: 'Select an option',
    options: options,
    className: 'custom-dropdown',
    value: options[0],
    onChange: jest.fn(),
    error: '',
    name: 'dropdown',
    disabled: false,
  }

  it('renders the dropdown label', () => {
    render(<Dropdown {...props} />)
    expect(screen.getByText(props.dropdownLabel)).toBeInTheDocument()
  })

  it('renders the selected option', () => {
    render(<Dropdown {...props} />)
    expect(screen.getByText(props.value.name)).toBeInTheDocument()
  })

  it('calls onChange when an option is selected', () => {
    render(<Dropdown {...props} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    const option = screen.getByText(options[1].name)
    fireEvent.click(option)
    expect(props.onChange).toHaveBeenCalledWith(options[1])
  })
})