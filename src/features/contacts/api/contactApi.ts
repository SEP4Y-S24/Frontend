import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";
import { ContactPropsResponse, ContactsPropsResponse } from "../types";

export const addContact = (loggedEmail: string, contactEmail: string): Promise<ContactPropsResponse> => {
    const data = {
        Email1: contactEmail,
        Email2: loggedEmail
    };
    return axios.post(`${baseURL}/UserService/users/contact`, data , axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        }); 
};

export const getAllContactsByUserEmail = (userEmail: string): Promise<ContactsPropsResponse> => {
    return axios.get(`${baseURL}/UserService/users/${userEmail}/contact`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            throw error.response.data;

        });
};



export const deleteContact = (loggedEmail: string, contactEmailToDelete: string): Promise<void> => {

    const data = {
        Email1: contactEmailToDelete,
        Email2: loggedEmail
    };

    return axios.delete(`${baseURL}/UserService/users/contact/`, {
        ...axiosConfig,
        data: data
    })
        .then(() => {})
        .catch(error => {
            throw error.response.data;
        });
};
