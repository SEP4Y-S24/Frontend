import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";
import {TagCollection, TagRequest, TagResponse} from "../types/category";


export const createCategory = (data: TagRequest): Promise<TagResponse> => {
    return axios.post(`${baseURL}/ToDoService/tag`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

export const deleteCategory = ( id: string): Promise<void> => {
    return axios.delete(`${baseURL}/ToDoService/tag/${id}`, axiosConfig)
        .then(() => {})
        .catch(error => {
            throw error.response.data;
        });
};

export const getAllCategories = (userId: string): Promise<TagCollection> => {
    return axios.get(`${baseURL}/ToDoService/tag/users/${userId}`, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

