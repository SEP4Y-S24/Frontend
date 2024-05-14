export interface AlarmProps {
    name: string
    time: any;
    isEnabled : boolean;
    onDelete?: () => void;
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