import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";
import { ContactPropsResponse, ContactsPropsResponse } from "../types";

export const addContact = (email: string): Promise<ContactPropsResponse> => {
    return axios.post(`${baseURL}/ContactService/contact`, email, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

export const getAllContactsByUserId = (userId: string): Promise<ContactsPropsResponse> => {
    return axios.get(`${baseURL}/ContactService/contact/users/${userId}`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};


export const deleteContact = ( contactId: string): Promise<void> => {
    return axios.delete(`${baseURL}/ContactService/contact/${contactId}`, axiosConfig)
        .then(() => {})
        .catch(error => {
            throw error.response.data;
        });
};