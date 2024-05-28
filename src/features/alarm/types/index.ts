export interface AlarmProps {
    alarm_id: string;
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
export interface AlarmUpdateProps {
    state: string
}
