import { render, screen, fireEvent } from '@testing-library/react'
import Badge from '../../../components/Elements/Badge/Badge'

describe('Badge component', () => {
    it('renders the badge with the correct style(warning) and text', () => {
        const onClickMock = jest.fn()
        const text = 'Warning badge'
        const styleType = 'warning'
        const isFilled = true

        render(<Badge text={text} styleType={styleType} isFilled={isFilled} onClick={onClickMock} />)

        const badgeElement = screen.getByText(text)

        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-warning')
        expect(badgeElement).toHaveClass('text-white')
        expect(badgeElement).toHaveClass('border')
        expect(badgeElement).toHaveClass('border-warning')
        expect(badgeElement).toHaveClass('cursor-default')
        expect(badgeElement).toHaveClass('inline-flex')
        expect(badgeElement).toHaveClass('items-center')
        expect(badgeElement).toHaveClass('rounded-md')
        expect(badgeElement).toHaveClass('px-2')
        expect(badgeElement).toHaveClass('py-1')
        expect(badgeElement).toHaveClass('text-xs')
        expect(badgeElement).toHaveClass('font-medium')

        fireEvent.click(badgeElement)
        expect(onClickMock).toHaveBeenCalled()
    })

    it('renders the badge with the correct style(danger) and text', () => {
        const onClickMock = jest.fn()
        const text = 'Danger badge'
        const styleType = 'danger'
        const isFilled = true

        render(<Badge text={text} styleType={styleType} isFilled={isFilled} onClick={onClickMock} />)

        const badgeElement = screen.getByText(text)

        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-danger')
        expect(badgeElement).toHaveClass('text-white')
        expect(badgeElement).toHaveClass('border')
        expect(badgeElement).toHaveClass('border-danger')
        fireEvent.click(badgeElement)
        expect(onClickMock).toHaveBeenCalled()
    })

    it('renders the badge with the correct style(success) and text', () => {
        const onClickMock = jest.fn()
        const text = 'success badge'
        const styleType = 'success'
        const isFilled = true

        render(<Badge text={text} styleType={styleType} isFilled={isFilled} onClick={onClickMock} />)

        const badgeElement = screen.getByText(text)
        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-green')
        expect(badgeElement).toHaveClass('text-white')
        expect(badgeElement).toHaveClass('border')
        expect(badgeElement).toHaveClass('border-green')
        expect(badgeElement).toHaveClass('cursor-default')
        expect(badgeElement).toHaveClass('inline-flex')
        expect(badgeElement).toHaveClass('items-center')
        expect(badgeElement).toHaveClass('rounded-md')
        expect(badgeElement).toHaveClass('px-2')
        expect(badgeElement).toHaveClass('py-1')
        expect(badgeElement).toHaveClass('text-xs')
        expect(badgeElement).toHaveClass('font-medium')

        fireEvent.click(badgeElement)
        expect(onClickMock).toHaveBeenCalled()
    })
})
