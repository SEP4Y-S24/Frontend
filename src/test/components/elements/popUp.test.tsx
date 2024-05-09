import { render, screen, fireEvent } from '@testing-library/react';
import PopUp from '../../../components/Elements/PopUp/PopUp';

describe('PopUp component', () => {
    it('renders the popup with the correct properties and handles cancel button click event', () => {
        const textAlert = 'Are you sure you want to deactivate?';
        const title = 'Warning';
        const type = 'success';
        const buttonCancelText = 'Cancel';
        const buttonProceedText = 'Deactivate';
        const onCancelMock = jest.fn(); 
        const onClickProceedMock = jest.fn(); 

        render(
            <PopUp
                textAlert={textAlert}
                title={title}
                type={type}
                buttonCancelText={buttonCancelText}
                buttonProceedText={buttonProceedText}
                onCancel={onCancelMock}
                onClickProceed={onClickProceedMock}
            />
        );

        const popupElement = screen.getByText(textAlert);
        expect(popupElement).toBeInTheDocument();

    
        const cancelButton = screen.getByText(buttonCancelText);
        expect(cancelButton).toBeInTheDocument();
        fireEvent.click(cancelButton);
        expect(onCancelMock).toHaveBeenCalled();
    });

    
});

describe('PopUp component with procced button', () => { 
    it('renders the popup with the correct properties and handles proceed button click event', () => {
        const textAlert = 'Are you sure you want to deactivate?';
        const title = 'Warning';
        const type = 'success';
        const buttonCancelText = 'Cancel';
        const buttonProceedText = 'Deactivate';
        const onCancelMock = jest.fn(); 
        const onClickProceedMock = jest.fn(); 

        render(
            <PopUp
                textAlert={textAlert}
                title={title}
                type={type}
                buttonCancelText={buttonCancelText}
                buttonProceedText={buttonProceedText}
                onCancel={onCancelMock}
                onClickProceed={onClickProceedMock}
            />
        );

        const popupElement = screen.getByText(textAlert);
        expect(popupElement).toBeInTheDocument();

    
        const proccedButton = screen.getByText(buttonProceedText);
        expect(proccedButton).toBeInTheDocument();
        fireEvent.click(proccedButton);
        expect(onClickProceedMock).toHaveBeenCalled();
    });
})