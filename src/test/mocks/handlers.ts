import { rest } from 'msw'
import { baseURL } from '../../lib/axios'


 let alarmData = [
    {
    id: "f656d97d-63b7-451a-91ee-0e620e652c9e",
    clockId: "f656d97d-63b7-451a-91ee-0e620e652c9e",
    name: 'Hello',
    setOffTime: "2024-05-21T08:44:53.627314Z",
    isActive: true,
    isSnoozed: false
},

{
    id: "f656d27d-64b7-451a-91ee-0e620e652c9e",
    clockId: "f656d98d-63b7-451a-91ee-0e620e652c9e",
    name: 'test',
    setOffTime: "2024-05-21T09:44:53.627314Z",
    isActive: true,
    isSnoozed: false
}
]

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
        userId: "user2",
        name: "Clock Three",
        time: "2024-05-23T10:44:53.627314Z",
        isActive: true
    }
]


export const handlers = [

    
    //ALARM API CALLS
    rest.post(`${baseURL}/AlarmService/alarm`, async (req , res, ctx) => {

      const alarm =  await req.json<{ id: string; clockId: string; name: string; setOffTime: string; isActive: boolean; isSnoozed: boolean; }>()
        alarmData.push( alarm)
        return res(ctx.status(201), ctx.json([
            {
                id: "3f9fc8c3-f55a-47ef-aa92-6198b9722060",
                clockId: alarm.clockId,
                 name: alarm.name,
                 setOffTime: alarm.setOffTime,
                isActive: alarm.isActive,
                isSnoozed: alarm.isSnoozed
            }
        ]))
    }),

    rest.get(`${baseURL}/AlarmService/alarms/clocks/f656d97d-63b7-451a-91ee-0e620e652c9e`,(req,res,ctx)=>{
        return res(
        ctx.status(200),
        ctx.json(alarmData)
    )}),

        rest.delete(`${baseURL}/AlarmService/alarm/:alarmId`, (req, res, ctx) => {
        const { alarmId } = req.params;
        alarmData = alarmData.filter(alarm => alarm.id !== alarmId)
    
        return res(
            ctx.status(200),
            ctx.json({ message: `Alarm with id ${alarmId} deleted successfully` })
        );
    }),

    
    //CLOCK API CALLS
    rest.get(`${baseURL}/UserService/users/:userId/clocks`, (req, res, ctx) => {
        const  userId  = "user1"
        // Filter clocks by userId
        const userClocks = clocksData.filter(clock => clock.userId === userId);
        // Return the filtered clocks as the response
        return res(
            ctx.status(200),
            ctx.json(userClocks)
        );
    })

]
