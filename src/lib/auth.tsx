import {configureAuth} from 'react-query-auth';

import storage from "../utils/storage";
import {loginWithEmailAndPassword} from "../features/auth/api/login";
import {registerWithEmailAndPassword} from "../features/auth/api/register";
import {
    CreateUserPropsRequest,
    LoginPropsRequest,
    UserPropsResponse
} from "../features/auth/types";

async function handleUserResponse(data: UserPropsResponse) {
    const { token, user } = data;
    storage.setToken(token);
    storage.setUser(user);
    return user;
}

async function userFn() {
    if (storage.getToken()) {
        const {user} = storage.getUser();
        console.log("Token Exists " + storage.getUser());
        return user;
    }
    if(storage.getUser()){
        return storage.getUser();
    }
    console.log("Token Does Not Exist");
    return null;
}
//c

async function loginFn(data: LoginPropsRequest) {
    const response = await loginWithEmailAndPassword(data);
    return await handleUserResponse(response);
}

async function registerFn(data: CreateUserPropsRequest) {
    const response = await registerWithEmailAndPassword(data);
    return await handleUserResponse(response);
}

async function logoutFn() {
    storage.clearToken();
    storage.clearUser();
    storage.clearClock()
    window.location.assign(window.location.origin as unknown as string);
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
    configureAuth({
        userFn,
        loginFn,
        registerFn,
        logoutFn,
    });
