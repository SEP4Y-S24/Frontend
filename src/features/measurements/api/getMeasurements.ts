
import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";
import {MeasuredDataResponse} from "../types";


/*export const getMeasurements = (): Promise<MeasuredDataResponse> => {
    return axios.get(`${baseURL}/AlarmService/alarm`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data; // Handle error appropriately
        });
};*/

export const getMeasurements = (): Promise<MeasuredDataResponse[]> => {
    // Simulate fetching data from an API
    return new Promise((resolve) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Dummy data
            const dummyData: MeasuredDataResponse[] = [
                { name: 'Measurement 1', day: '05-20', value: '10' },
                { name: 'Measurement 2', day: '05-21', value: '15' },
                { name: 'Measurement 3', day: '05-22', value: '20' },
                { name: 'Measurement 4', day: '05-22', value: '20' },
                // Add more dummy data as needed
            ];

            resolve(dummyData);
        }, 1000);
    });
};
