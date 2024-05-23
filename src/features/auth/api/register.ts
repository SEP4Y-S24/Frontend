//import { axios } from '@/lib/axios';

import {CreateUserPropsRequest, UserPropsResponse} from '../types';

import axios from "axios";
import {axiosConfig, baseURL} from "../../../lib/axios";


export const registerWithEmailAndPassword = (data: CreateUserPropsRequest): Promise<UserPropsResponse> => {

    return axios.post(`${baseURL}/UserService/users`, data, axiosConfig)
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};


