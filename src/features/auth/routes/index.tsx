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

