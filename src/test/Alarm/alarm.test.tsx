import {render, screen} from '@testing-library/react'
import { Alarm } from '../../pages/Alarm'
// // import userEvent from '@testing-library/user-event';
// // import { act } from 'react-dom/test-utils';



describe('Test Alarm functionality',()=>{
    test ("Renders correctly",()=>{
        render(<Alarm/>)
        expect(screen.getByText(/Alarms/)).toBeInTheDocument()
    })})
//     test ('Create an alarm',async ()=>{

        
//         //     render(<Alarm/>)
//         //     //given
//         // // userEvent.type(screen.getByText('Time'), '2024-05-22T08:30:00Z');
//         // userEvent.type(screen.getByText('Name'), 'Morning Alarm');

//         // //when 
//         // userEvent.click(screen.getByRole('button', { name: /Add an alarm/i }))
//         //Expect to receive a 200 status code
//         })

//     test ('Get all the alamrs',async()=>{
//         //arrange
//             // render(<Alarm/>)
//         //act
//         // const alarm1 = await screen.findAllByText('Hello')
//         // const alarm2 = await screen.findAllByText('test')
//         // //then
//         // expect(alarm1).toBeInTheDocument()
//         // expect(alarm2).toBeInTheDocument()
//         //for some reason the alarms are not being loaded from the msw

//     })
//     //Delete an alarm test to make , but since it is not possible to render the mocked list , this test does not make sense to make

// })