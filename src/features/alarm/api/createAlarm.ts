import { AlarmProps } from "../types";
import axios from "axios";

///////////// TEMPORARY JUST AN EXAMPLE ////////////////

const BASE_URL = "http://your-api-url.com/api"; // Update this with your actual API base URL

export const createAlarm = (clockId: string, data: AlarmProps): Promise<AlarmProps> => {
    return axios.post(`${BASE_URL}/clocks/${clockId}/alarms`, data)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};

export const getAllAlarms = (clockId: string): Promise<AlarmProps[]> => {
    return axios.get(`${BASE_URL}/clocks/${clockId}/alarms`)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};

export const getAlarmById = (clockId: string, alarmId: string): Promise<AlarmProps> => {
    return axios.get(`${BASE_URL}/clocks/${clockId}/alarms/${alarmId}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};

export const updateAlarm = (clockId: string, alarmId: string, data: AlarmProps): Promise<AlarmProps> => {
    return axios.put(`${BASE_URL}/clocks/${clockId}/alarms/${alarmId}`, data)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};

export const deleteAlarm = (clockId: string, alarmId: string): Promise<void> => {
    return axios.delete(`${BASE_URL}/clocks/${clockId}/alarms/${alarmId}`)
        .then(() => {})
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};
