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

