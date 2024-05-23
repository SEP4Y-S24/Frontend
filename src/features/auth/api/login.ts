import {CreateUserPropsResponse, LoginPropsRequest, UserPropsResponse} from '../types';

//what I send
export type LoginCredentialsDTO = {
    email: string;
    password: string;
};

export const loginWithEmailAndPassword = (
    data: LoginPropsRequest
): Promise<UserPropsResponse> => {
    //this will be received from backend and stored locally in the client
    const hardcodedUserData: UserPropsResponse = {
        token: 'mock_jwt_token', // Hardcoded JWT token
        user: {
            userId: '1',
            email: data.email,
            name: 'John Doe',
            avatarId: 1
        }
    };
    // Return a Promise that immediately resolves with the hardcoded user data
    return Promise.resolve(hardcodedUserData);
};
/*export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
    return axios.post('/auth/login', data);
};*/
