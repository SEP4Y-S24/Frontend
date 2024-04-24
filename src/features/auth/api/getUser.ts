

import { AuthUser } from '../types';
import {undefined} from "zod";
const hardcodedUserData: AuthUser = {
    id: '1',
    email: 'example@example.com',
    name: 'John Doe'
    // Add other user properties as needed
};
//todo: replace with actual api call, example https://github.com/alan2207/react-query-auth/blob/master/examples/vite/src/lib/api.ts#L8
export const getUser = (): Promise<{ user: AuthUser | undefined}> => {
    //return axios.get('/auth/me');
    //return Promise.reject(new Error('No user data available'))
    return Promise.resolve({user: hardcodedUserData});
};
