import { MessagesResponseProps, SendMessageProps} from "../types";
import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";


export const sendMessage = (data: SendMessageProps): Promise<SendMessageProps> => {
    return axios.post(`${baseURL}/UserService/messages`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};


export const getAllSentMessages = (userId: string): Promise<MessagesResponseProps> => {
    return axios.get(`${baseURL}/UserService/users/${userId}/messages?activity=sent`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};


export const getAllReceivedMessages = (userId: string): Promise<MessagesResponseProps> => {
    return axios.get(`${baseURL}/UserService/users/${userId}/messages?activity=received`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

