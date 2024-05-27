
export interface CreateUserPropsRequest{
    email: string,
    name: string,
    password: string,
    avatarId: number;

}
export interface LoginPropsRequest {
    email: string;
    password: string;
}
export interface CreateUserPropsResponse{
    email: string,
    name: string,
    userId: string,
    avatarId: number;

}

export type UserPropsResponse = {
    token: string;
    user: CreateUserPropsResponse;
};

