import {LoginPropsRequest, UserPropsResponse} from '../types';
import axios from "axios";
import {axiosConfigAuth, baseURL} from "../../../lib/axios";



export const loginWithEmailAndPassword = (data: LoginPropsRequest): Promise<UserPropsResponse> => {
    return axios.post(`${baseURL}/UserService/users/login`, data, axiosConfigAuth)
        .then(response => response.data)
        .catch(error => {
            error = error.response.data;
            console.log("error: " + error)
            throw error;
        });
};
