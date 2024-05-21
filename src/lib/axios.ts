import {AxiosRequestConfig} from "axios";

export const baseURL = "https://sep4coupledclock.azure-api.net";

const functionKey = '95029b2c630d4b50bccbc3a777e952c6';

export const axiosConfig: AxiosRequestConfig = {
    headers: {
        'Ocp-Apim-Subscription-Key': functionKey,
    }
};
