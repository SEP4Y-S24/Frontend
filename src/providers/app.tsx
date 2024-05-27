import Button from "../components/Elements/Button";
import React, { useState} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Landing} from "../pages/Landing";
import {publicRoutes} from "../routes/public";
import { protectedRoutes} from "../routes/protected";


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

    const route =  [...protectedRoutes, ...publicRoutes];
    const router = createBrowserRouter(route);


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
