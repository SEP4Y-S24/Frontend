import { render,screen } from '@testing-library/react';
import Card  from '../../../components/Elements/Card/Card';


describe('Card component', ()=>{
    it('render card component',()=>{
        render(<Card imageUrl='https://example.com/image.jpg' altText='MyImage' />)
        const image = screen.getByAltText("MyImage")
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
        expect(image).toHaveAttribute('alt', 'MyImage')
    })
})