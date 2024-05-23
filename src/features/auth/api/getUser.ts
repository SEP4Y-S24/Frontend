
import { CreateUserPropsResponse } from '../types';

import hardCodedUser from "./hardcodedUser.json";
// getting user data from the backend by sending JWT token
export const getUser = (): Promise<{ user: CreateUserPropsResponse | undefined}> => {

    const hardcodedUser = hardCodedUser as CreateUserPropsResponse;
    if(!Object.keys(hardcodedUser).length) {
        return Promise.reject(new Error('No user data available'));
    }
    else {
        return Promise.resolve({user: hardcodedUser});
    }
    //return axios.get('/auth/me');
    //return Promise.reject(new Error('No user data available'))
    //return Promise.resolve({user: hardcodedUserData});
};
