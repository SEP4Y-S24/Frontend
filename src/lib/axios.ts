import {AxiosRequestConfig} from "axios";

export const baseURL = "https://sep4coupledclock.azure-api.net";

const functionKey = 'Lz92qDBJnC6aBUlTFmHVDRvumlcNhqkXQWkQ3b7rmBeo+IRcl0J77A==';

export const axiosConfig: AxiosRequestConfig = {
    headers: {
        'Ocp-Apim-Subscription-Key': functionKey,
    }
};
