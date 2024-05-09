import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import RadioButtonCard from '../../../components/Form/RadioButton';

describe('RadioButtonCard', () => {
  const props = {
    imageUrl: 'test-image-url',
    altText: 'test-alt-text',
    id: 'test-id',
    selectedOption: null,
    onChange: jest.fn(), // Mock onChange function
  };

  it('calls onChange when clicked', () => {
    render(<RadioButtonCard {...props} />)
    // eslint-disable-next-line testing-library/no-node-access
    const radioButton = document.getElementById(props.id)// Could not use other query to get the radio
    if(radioButton)
    fireEvent.click(radioButton)
    expect(props.onChange).toHaveBeenCalledWith(props.id)
  })  
})

