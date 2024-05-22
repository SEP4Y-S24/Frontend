export interface AlarmProps {
    name?: string;
    time: any;
    isEnabled : boolean;
    onDelete?: () => void;
}
export interface CreateAlarmProps {
    clock_id: string;
    set_of_time:string;
    name: string;
}
export interface AlarmPropsResponse {
    id: string,
    clockId: string,
    name?: string,
    setOffTime: string,
    isActive: boolean,
    isSnoozed: boolean
}


export let dummyDataForAlarms: AlarmProps[] = [
    {
        "name": "Good morning",
        "time": ('7:30'),
        "isEnabled": true,
    },
    {
        "name": "Work",
        "time": ('9:30'),
        "isEnabled": true,
    },
    {
        "name": "School",
        "time": ('15:30'),
        "isEnabled": false,
    },

]
