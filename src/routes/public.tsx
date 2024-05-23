import {lazyImport} from "../utils/lazyImport";
import {Landing} from "../pages/Landing";
import React from "react";


const { AuthRoutes } = lazyImport(() => import('../features/auth/routes'), 'AuthRoutes');

export const publicRoutes = [
    {
        path: '/auth/*',
        element: <AuthRoutes />,
    },
    { path: '/', element: <Landing /> },
];
