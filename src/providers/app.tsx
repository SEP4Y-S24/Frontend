import Button from "../components/Elements/Button";
import React, {useEffect, useState} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Landing} from "../pages/Landing";
import {publicRoutes} from "../routes/public";
import { protectedRoutes} from "../routes/protected";
import {useUser} from "../lib/auth";
import storage from "../utils/storage";


const ErrorFallback = () => {
    return (
        <div
            className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
            <Button text={"Click me"} styleType={"danger"} onClick={() => window.location.assign(window.location.origin)}/>
        </div>
    );
};



const commonRoutes = [
    { path: '/', element: <Landing /> },
];

export const AppProvider =  () => {
    const [user, setUser] = useState(storage.getUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await storage.getUser();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user data', error);
                // Handle the error accordingly
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                <span>loading</span>
            </div>
        );
    }

    const route = user.data ? protectedRoutes : publicRoutes;
    const routes = [...route, ...commonRoutes];
    const router = createBrowserRouter(routes);


    return (
        <React.Suspense
            fallback={
                <div className="flex items-center justify-center w-screen h-screen">
                    <span>loading</span>
                </div>
            }>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <RouterProvider router={router} />
            </ErrorBoundary>
        </React.Suspense>

    );
};
