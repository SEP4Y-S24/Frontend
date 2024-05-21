import {AlarmModel, AlarmProps} from "../types";
import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";



export const createAlarm = (data: AlarmModel): Promise<AlarmProps> => {
    return axios.post(`${baseURL}/AlarmService/alarm`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};

export const getAllAlarms = (clockId: string): Promise<AlarmProps[]> => {
    return axios.get(`${baseURL}/AlarmService/alarms`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};

export const getAlarmById = (clockId: string, alarmId: string): Promise<AlarmProps> => {
    return axios.get(`${baseURL}/clocks/${clockId}/alarms/${alarmId}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};

export const updateAlarm = (alarmId: string, data: AlarmProps): Promise<AlarmProps> => {
    return axios.put(`${baseURL}/AlarmService/alarms/${alarmId}`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};

export const deleteAlarm = (alarmId: string): Promise<void> => {
    return axios.delete(`${baseURL}/AlarmService/alarms`, axiosConfig)
        .then(() => {})
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};
