import axios from "axios"; 
import { axiosConfig,baseURL } from "../../lib/axios";
import { GraphPropsResponse } from "./types";


export const getAvarageMeasurement = (type: string, clockId: string): Promise<GraphPropsResponse> => {
    return axios.get(`${baseURL}/SEP4-MeasurementService/measurements/${clockId}/avarage`, {
        ...axiosConfig,
        params: {
            type: type
        }
    })
    .then(response => response.data)
    .catch(error => {
        throw error.response.data;
    });
};