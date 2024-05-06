import { UserResponse } from '../types';

//what I send
export type LoginCredentialsDTO = {
    email: string;
    password: string;
};

export const loginWithEmailAndPassword = (
    data: LoginCredentialsDTO
): Promise<UserResponse> => {
    //this will be received from backend and stored locally in the client
    const hardcodedUserData: UserResponse = {
        jwt: 'mock_jwt_token', // Hardcoded JWT token
        user: {
            id: '1',
            email: data.email,
            name: 'John Doe'
        }
    };
    // Return a Promise that immediately resolves with the hardcoded user data
    return Promise.resolve(hardcodedUserData);
};
/*export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
    return axios.post('/auth/login', data);
};*/
