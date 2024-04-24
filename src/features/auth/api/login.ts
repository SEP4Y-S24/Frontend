import { UserResponse } from '../types';
export type LoginCredentialsDTO = {
    email: string;
    password: string;
};
//delete later when backend is done
const hardcodedUserData: UserResponse = {
    jwt: 'mock_jwt_token', // Hardcoded JWT token
    user: {
        id: '1',
        email: 'example@example.com',
        name: 'John Doe'
    }
};
export const loginWithEmailAndPassword = (
    data: LoginCredentialsDTO
): Promise<UserResponse> => {
    // Return a Promise that immediately resolves with the hardcoded user data
    return Promise.resolve(hardcodedUserData);
};
/*export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
    return axios.post('/auth/login', data);
};*/
