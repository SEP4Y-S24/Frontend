import {CreateUserPropsRequest, CreateUserPropsResponse, LoginPropsRequest, UserPropsResponse} from '../types';
import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";

//what I send
export type LoginCredentialsDTO = {
    email: string;
    password: string;
};

export const loginWithEmailAndPassword = (data: LoginPropsRequest): Promise<UserPropsResponse> => {

    return axios.post(`${baseURL}/UserService/users/login`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

/*export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
    return axios.post('/auth/login', data);
};*/
