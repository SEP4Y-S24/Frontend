import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';
import bcrypt from "bcryptjs-react";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
        </Routes>
    );
};
export const hashPassword = async (password: string): Promise<string> => {
    // Define the number of salt rounds (higher number means more security but slower hashing)
    const saltRounds = 10;
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash the password with the salt
    return await bcrypt.hash(password, salt);
};
