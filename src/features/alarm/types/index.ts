export interface AlarmProps {
    name?: string;
    hours: number,
    minutes: number,
    isEnabled : boolean;
    onDelete?: () => void;
}
export interface CreateAlarmProps {
    clock_id: string;
    hours: number,
    minutes: number,
    name: string;
}
export interface AlarmPropsResponse {
    id: string,
    clockId: string,
    name: string,
    hours: number,
    minutes: number,
    isActive: boolean,
    isSnoozed: boolean
}
export interface AlarmsPropsResponse {
    alarms: AlarmPropsResponse[]
}

/*
export const dummyAlarms: AlarmPropsResponse[] = [
    {
        id: "1",
        clockId: "f656d97d-63b7-451a-91ee-0e620e652c9e",
        name: "Morning Alarm",
        hours: 7,
        minutes: 30,
        isActive: true,
        isSnoozed: false
    },
    {
        id: "2",
        clockId: "f656d97d-63b7-451a-91ee-0e620e652c9e",
        name: "Work Alarm",
        hours: 8,
        minutes: 0,
        isActive: true,
        isSnoozed: false
    },
    {
        id: "3",
        clockId: "f656d97d-63b7-451a-91ee-0e620e652c9e",
        name: "Lunch Break Alarm",
        hours: 12,
        minutes: 0,
        isActive: true,
        isSnoozed: true
    },
    {
        id: "4",
        clockId: "f656d97d-63b7-451a-91ee-0e620e652c9e",
        name: "Evening Workout",
        hours: 18,
        minutes: 0,
        isActive: false,
        isSnoozed: false
    },
    {
        id: "5",
        clockId: "f656d97d-63b7-451a-91ee-0e620e652c9e",
        name: "Dinner Reminder",
        hours: 19,
        minutes: 30,
        isActive: true,
        isSnoozed: false
    },
    {
        id: "6",
        clockId: "f656d97d-63b7-451a-91ee-0e620e652c9e",
        name: "Bedtime Alarm",
        hours: 22,
        minutes: 0,
        isActive: true,
        isSnoozed: true
    }
];
*/
