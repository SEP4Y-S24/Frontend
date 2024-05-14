import { render, screen, fireEvent } from '@testing-library/react'
import InputField from '../../../components/Form/InputField'

describe('InputField component', () => {
  it('renders the input field with the correct properties and handles change event', () => {
    const labelText = 'Username'
    const placeholder = 'Enter your username'
    const className = 'block p-2.5 w-full text-sm text-primaryText bg-white-50 rounded-md border border-stroke focus:outline-none focus:ring-1'
    const value = 'testuser'
    const type = 'text'
    const error = 'Username is required'
    const isRequired = true
    const name = 'username'
    const onChangeMock = jest.fn()

    render(
      <InputField
        labelText={labelText}
        placeholder={placeholder}
        className={className}
        value={value}
        type={type}
        error={error}
        isRequired={isRequired}
        name={name}
        onChange={onChangeMock}
      />
    )

    // Assert that the input field is rendered with the correct properties
    const inputElement = screen.getByDisplayValue(value)
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('placeholder', placeholder)
    expect(inputElement).toHaveClass(className)
    expect(inputElement).toHaveValue(value)
    expect(inputElement).toHaveAttribute('type', type)
    expect(inputElement).toBeRequired()

    // Assert that the error message is rendered
    const errorElement = screen.getByText(error)
    expect(errorElement).toBeInTheDocument()

    // Simulate change event on the input field and assert that the onChangeMock function is called
    fireEvent.change(inputElement, { target: { value: 'newuser' } })
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('renders the input field as disabled when disabled prop is true', () => {
    const disabled = true;

    render(<InputField disabled={disabled} />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeDisabled();
  })
})