import Button from "../../../components/Elements/Button";
import { render,screen } from '@testing-library/react';


describe('Button component', ()=>{
    it('renders the button with styleType danger',()=>{
        render(<Button className="bg-danger hover:bg-dangerHover border-none text-white" text="MyButton" styleType="danger"/>)
        const button = screen.getByText("MyButton")
        expect(button).toHaveClass('bg-danger')
        expect(button).toHaveClass('hover:bg-dangerHover')
        expect(button).toHaveClass('border-none')
        expect(button).toHaveClass('text-white')
    })
    it('renders the button with styleType sucess',()=>{
        render(<Button className="bg-green hover:bg-greenHover border-none text-white" text="MyButton" styleType="danger"/>)
        const button = screen.getByText("MyButton")
        expect(button).toHaveClass('bg-green')
        expect(button).toHaveClass('hover:bg-greenHover')
        expect(button).toHaveClass('border-none')
        expect(button).toHaveClass('text-white')
    })

    it('renders the button with styleType info',()=>{
        render(<Button className="bg-primaryColor hover:bg-primaryColorHover border-none text-white" text="MyButton" styleType="danger"/>)
        const button = screen.getByText("MyButton")
        expect(button).toHaveClass('bg-primaryColor')
        expect(button).toHaveClass('hover:bg-primaryColorHover')
        expect(button).toHaveClass('border-none')
        expect(button).toHaveClass('text-white')
    })

    it('renders the button with styleType neutral',()=>{
        render(<Button className="bg-white hover:bg-whiteHover border border-stroke border-dark text-dark" text="MyButton" styleType="danger"/>)
        const button = screen.getByText("MyButton")
        expect(button).toHaveClass('bg-white')
        expect(button).toHaveClass('hover:bg-whiteHover')
        expect(button).toHaveClass('border border-stroke border-dark')
        expect(button).toHaveClass('text-dark')
    })

    it('renders the button with styleType warning',()=>{
        render(<Button className="bg-warning hover:bg-warningHover border-none text-white" text="MyButton" styleType="danger"/>)
        const button = screen.getByText("MyButton")
        expect(button).toHaveClass('bg-warning')
        expect(button).toHaveClass('hover:bg-warningHover')
        expect(button).toHaveClass('border-none')
        expect(button).toHaveClass('text-white')
    })

    it('renders the button with styleType default',()=>{
        render(<Button className="bg-primaryColor hover:bg-primaryColorHover border-none text-white" text="MyButton" styleType="danger"/>)
        const button = screen.getByText("MyButton")
        expect(button).toHaveClass('bg-primaryColor')
        expect(button).toHaveClass('hover:bg-primaryColorHover')
        expect(button).toHaveClass('border-none')
        expect(button).toHaveClass('text-white')
        expect(button).toHaveClass('py-2 px-4 rounded')
    })


}
)