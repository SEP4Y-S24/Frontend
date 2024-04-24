export type AuthUser = {
    id: string;
    email: string;
    name: string;
}


export type UserResponse = {
    jwt: string;
    user: AuthUser;
};
