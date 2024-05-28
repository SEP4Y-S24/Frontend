import { render,screen,fireEvent,act } from "@testing-library/react"
import { Settings } from "../../pages"
import {setupServer} from 'msw/node'
import { rest } from "msw"
import { baseURL } from "../../lib/axios"
import storage from "../../utils/storage"
import userEvent from "@testing-library/user-event"


jest.mock("../../utils/storage")


const clocksData = [
    {
        id: "clock1",
        userId: "user1",
        name: "Clock One",
        time: "2024-05-21T08:44:53.627314Z",
        isActive: true
    },
    {
        id: "clock2",
        userId: "user1",
        name: "Clock Two",
        time: "2024-05-22T09:44:53.627314Z",
        isActive: false
    },
    {
        id: "clock3",
        userId: "user1",
        name: "Clock Three",
        time: "2024-05-23T10:44:53.627314Z",
        isActive: true
    }
]


const server = setupServer(
   
      rest.get(`${baseURL}/UserService/users/:userId/clocks`, (req, res, ctx) => {
        const  userId  = "user1"
        // Filter clocks by userId
        const userClocks = clocksData.filter(clock => clock.userId === userId);
        // Return the filtered clocks as the response
        return res(
            ctx.status(200),
            ctx.json(userClocks)
        );
    }),)
  
  
  // establish API mocking before all tests
  beforeAll(() => server.listen())
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers())
  // clean up once the tests are done
  afterAll(() => server.close())






describe('Test Clock page functionality',()=>{
    beforeEach(() => {
            storage.getUser = jest.fn().mockReturnValue({ userId: 'user1' })

        });
    test ("Renders correctly",async  ()=>{
            //arrange


            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act( async () => render(<Settings/>));
            
            
            //act


            //assert

            expect(screen.getByText('Switch to a different clock')).toBeInTheDocument();
            expect(screen.getByText('To see a data of a different clock')).toBeInTheDocument();
    })
    // test ('fetches and displays the clocks',async ()=>{
        
    //     //arrange

    //      render(<Settings />)
                  


    //     // Act & Assert
    
    //     expect(screen.getByText('Clock One')).toBeInTheDocument();

    //     expect(screen.getByText('Clock Two')).toBeInTheDocument();
  
    //     expect(screen.getByText('Clock Three')).toBeInTheDocument();
     
          
    //     })

    // test ('add a clock',async()=>{

    //    //Arrange
    //    render(<Settings />)

    //    //Act
    //     userEvent.type(screen.getByText('Name of the clock'), 'NEWCLOCK')
    //     userEvent.type(screen.getByText('Insert generated ID'),'AAABBB32321' )
    //     const timezoneDropdown = screen.getByLabelText('Select timezone');
    //     fireEvent.change(timezoneDropdown, { target: { value: 'UTC+3' } })
    //     const addButton = screen.getByText('Connect to the clock')

    //         fireEvent.click(addButton);



    //    //Assert
    //      expect(screen.getByText('NEWCLOCK')).toBeInTheDocument();
    // })


    //the tests does not run
   

})