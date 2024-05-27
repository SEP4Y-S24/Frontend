import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";
import { ContactPropsResponse, ContactsPropsResponse } from "../types";

export const addContact = (email: string): Promise<ContactPropsResponse> => {
    return axios.post(`${baseURL}/ContactService/users/contact`, email, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        }); 
};

export const getAllContactsByUserEmail = (userEmail: string): Promise<ContactsPropsResponse> => {
    return axios.get(`${baseURL}/UserService/users/${userEmail}/contact`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};


export const deleteContact = ( contactEmail: string): Promise<void> => {
    return axios.delete(`${baseURL}/ContactService/users/contact/${contactEmail}`, axiosConfig)
        .then(() => {})
        .catch(error => {
            throw error.response.data;
        });
};