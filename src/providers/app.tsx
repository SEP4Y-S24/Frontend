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
import { AuthLoader } from "../lib/auth";


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

export const AppProvider = () => {
    const [loading, setLoading] = useState(true);
    const user = useUser();
    console.log(user);
    useEffect(() => {
        setLoading(false); // Simulate loading completion
    }, []);

    const route =  [...protectedRoutes, ...publicRoutes];
    const routes = [...route, ...commonRoutes];
    const router = createBrowserRouter(route);

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <React.Suspense
            fallback={
                <div className="flex items-center justify-center w-screen h-screen">
                    <span>loading</span>
                </div>
            }
        >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <RouterProvider router={router} />
            </ErrorBoundary>
        </React.Suspense>
    );
};
