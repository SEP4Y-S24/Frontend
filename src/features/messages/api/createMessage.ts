import {SendMessageProps} from "../types";
import axios, {HttpStatusCode} from "axios";

export const sendMessage = (
    data: SendMessageProps
): Promise<HttpStatusCode> => {
    return axios.post('http://192.168.43.151:8080/Message', data);
};