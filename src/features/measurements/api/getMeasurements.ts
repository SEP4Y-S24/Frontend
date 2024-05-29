import axios from "axios"; 
import {axiosConfig, baseURL} from "../../../lib/axios"; 
import {MeasurementPropsResponse, MeasurementType } from "../types";

// last measured data
export const getMeasurements = (clockId: string, type: MeasurementType) : Promise<MeasurementPropsResponse> => {
    return axios.get(`${baseURL}/SEP4-MeasurementService/measurements/${clockId}?type=${type}`, axiosConfig)
    .then(response => {
        const data = response.data as MeasurementPropsResponse; 
        return data;
    })
    .catch(error => {
        throw error.response.data; 
    });
}

//average of the day 


