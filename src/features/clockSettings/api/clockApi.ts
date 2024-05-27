import axios from "axios"; 
import {axiosConfig, baseURL} from "../../../lib/axios";  
import { ClockPropsResponse, ClockPropsResquest } from "../types";

    
    
    //done, create a clock 
    
export const createClock = (data: ClockPropsResquest): Promise<ClockPropsResponse > => {
    return axios.post(`${baseURL}/ClockService/clock`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};


//done , update a clock
export const updateClock = ( data: ClockPropsResquest, clockId:string): Promise<ClockPropsResponse> => {
    return axios.patch(`${baseURL}/ClockService/clock/${clockId}`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

//Get all clock by userId

export const getAllClocks = (userId: string): Promise<ClockPropsResponse[]> => {
    return axios.get(`${baseURL}/UserService/users/${userId}/clocks`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};
//Deleting a clock
export const deleteClock = ( clockId: string): Promise<void> => {
    return axios.delete(`${baseURL}/ClockService/clock/${clockId}`, axiosConfig)
        .then(() => {})
        .catch(error => {
            throw error.response.data;
        });
};





