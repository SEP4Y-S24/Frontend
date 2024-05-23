import {CreateUserPropsRequest, CreateUserPropsResponse, LoginPropsRequest, UserPropsResponse} from '../types';
import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";



export const loginWithEmailAndPassword = (data: LoginPropsRequest): Promise<UserPropsResponse> => {
    console.log("Login api "+data)

    return axios.post(`${baseURL}/UserService/users/login`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            console.log("error "+error.response.data)
            throw error.response.data;
        });
};

/*export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
    return axios.post('/auth/login', data);
};*/
