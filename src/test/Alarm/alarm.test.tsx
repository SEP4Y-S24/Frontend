import {render, screen} from '@testing-library/react'
import { Alarm } from '../../pages/Alarm'
import userEvent from '@testing-library/user-event';



describe('Test Alarm functionality',()=>{
    test ("Renders correctly",()=>{
        render(<Alarm/>)
        expect(screen.getByText(/Alarms/)).toBeInTheDocument()
    })
    test ('Create an alarm',()=>{
        render(<Alarm/>)
        //given
        // userEvent.type(screen.getByText('Time'), '2024-05-22T08:30:00Z');
        userEvent.type(screen.getByText('Name'), 'Morning Alarm');

        //when 
        userEvent.click(screen.getByRole('button', { name: /Add an alarm/i }))
        //then
        //Expect to receive a 200 status code
    })

    test ('Get all the alamrs',async()=>{
        //when
        render(<Alarm/>)
        //then
        const alarm1 = await screen.findAllByText('Hello')
        const alarm2 = await screen.findAllByText('test')

        expect(alarm1).toBeInTheDocument()
        expect(alarm2).toBeInTheDocument()
    })

})