import Button from "../components/Elements/Button";
import React from "react";
import {ErrorBoundary} from "react-error-boundary";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Landing} from "../pages/Landing";
import {publicRoutes} from "../routes/public";
import { protectedRoutes} from "../routes/protected";
import {useUser} from "../lib/auth";


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
//com
export const AppProvider =  () => {
    const user =  useUser();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const route = user.data ? protectedRoutes : publicRoutes;
    //console.log(route);
    const routes =  [...route, ...commonRoutes];
    const router = createBrowserRouter(routes);

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
