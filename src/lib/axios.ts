import {AxiosRequestConfig} from "axios";

export const baseURL = "https://wapi-test-from-website.azure-api.net/";
const functionKey = '56de02fbf72147c789334de9bb453f41';

export const axiosConfig: AxiosRequestConfig = {
    headers: {
        'Ocp-Apim-Subscription-Key': functionKey,
        'host':'wapi-test-from-website.azure-api.net'
    }
};
