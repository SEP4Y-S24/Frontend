import { rest } from 'msw'
import { baseURL } from '../../lib/axios'

export const handlers = [
    rest.post(`${baseURL}/AlarmService/alarm`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
            {
                id: "3f9fc8c3-f55a-47ef-aa92-6198b9722060",
                clockId: "f656d97d-63b7-451a-91ee-0e620e652c9e",
                 name: "string",
                 setOffTime: "2024-05-20T14:30:45Z",
                isActive: true,
                isSnoozed: false
            }
        ]))
    }),

    rest.get(`${baseURL}/AlarmService/alarms/clocks/1`,(req,res,ctx)=>{
        return res(
        ctx.status(200),
        ctx.json([
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
        ])
    )})
]
