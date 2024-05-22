import {AlarmProps, AlarmPropsResponse, AlarmsPropsResponse, CreateAlarmProps} from "../types";
import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";


//done
export const createAlarm = (data: CreateAlarmProps): Promise<AlarmPropsResponse> => {
    return axios.post(`${baseURL}/AlarmService/alarm`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

// done ready for testing
export const getAllAlarmsByClockId = (clockId: string): Promise<AlarmsPropsResponse> => {
    return axios.get(`${baseURL}/AlarmService/alarms/clocks/${clockId}`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

export const getAlarmById = (alarmId: string): Promise<AlarmPropsResponse> => {
    return axios.get(`${baseURL}/AlarmService/alarm/${alarmId}`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

export const updateAlarm = ( alarmId: string, state: boolean): Promise<AlarmProps> => {
    return axios.patch(`${baseURL}/AlarmService/alarm/${alarmId}/state`, state, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

export const deleteAlarm = ( alarmId: string): Promise<void> => {
    return axios.delete(`${baseURL}/AlarmService/alarm/${alarmId}`, axiosConfig)
        .then(() => {})
        .catch(error => {
            throw error.response.data;
        });
};
/*
export const getDummyAlarms = (): Promise<AlarmPropsResponse[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyAlarms);
        }, 1000); // Simulate a 1 second delay for the mock API call
    });
};*/
