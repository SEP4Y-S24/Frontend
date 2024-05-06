import { configureAuth } from 'react-query-auth';
import {UserResponse} from "../features/auth/types";
import storage from "../utils/storage";
import {getUser} from "../features/auth/api/getUser";
import {loginWithEmailAndPassword} from "../features/auth/api/login";
import {registerWithEmailAndPassword} from "../features/auth/api/register";


export type LoginCredentials = {
    email: string;
    password: string;
};

export type RegisterCredentials = {
    email: string;
    name: string;
    password: string;
};

async function handleUserResponse(data: UserResponse) {
    const { jwt, user } = data;
    storage.setToken(jwt);
    return user;
}

async function userFn() {
    if (storage.getToken()) {
        const {user} = await getUser();
        return user;
    }
    return null;
}

async function loginFn(data: LoginCredentials) {
    const response = await loginWithEmailAndPassword(data);
    const user = await handleUserResponse(response);
    return user;
}

async function registerFn(data: RegisterCredentials) {
    const response = await registerWithEmailAndPassword(data);
    const user = await handleUserResponse(response);
    return user;
}

async function logoutFn() {
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
    configureAuth({
        userFn,
        loginFn,
        registerFn,
        logoutFn,
    });
