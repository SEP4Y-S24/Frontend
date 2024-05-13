import {SendMessageProps} from "../types";
import axios, {HttpStatusCode} from "axios";

export const sendMessage = (
    data: SendMessageProps
): Promise<HttpStatusCode> => {
    return axios.post('http://10.154.214.49:8080/Message', data);
};
