//import { axios } from '@/lib/axios';

import { UserResponse } from '../types';

export type RegisterCredentialsDTO = {
    email: string;
    password: string;
    name: string;
};

const hardcodedUserData: UserResponse = {
    jwt: 'mock_jwt_token', // Hardcoded JWT token
    user: {
        id: '1',
        email: 'example@example.com',
        name: 'John Doe'
    }
};
export const registerWithEmailAndPassword = (
    data: RegisterCredentialsDTO
): Promise<UserResponse> => {
    // Return a Promise that immediately resolves with the hardcoded user data
    return Promise.resolve(hardcodedUserData);
};


/*export const registerWithEmailAndPassword = (
    data: RegisterCredentialsDTO
): Promise<UserResponse> => {
    return axios.post('/auth/register', data);
};*/
