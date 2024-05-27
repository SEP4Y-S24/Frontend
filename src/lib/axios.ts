import {AxiosRequestConfig} from "axios";
import storage from "../utils/storage";

export const baseURL = "https://sep4coupledclock.azure-api.net";
const functionKey = '95029b2c630d4b50bccbc3a777e952c6';
//const token = storage.getToken();

export const axiosConfig: AxiosRequestConfig = {
    headers: {
        'Ocp-Apim-Subscription-Key': functionKey,
        //Authorization: `Bearer ${token}`
    }
};
export const axiosConfigAuth: AxiosRequestConfig = {
    headers: {
        'Ocp-Apim-Subscription-Key': functionKey,
    }
};
