import Button from "../components/Elements/Button";
import React from "react";
import {ErrorBoundary} from "react-error-boundary";
import {HelmetProvider} from "react-helmet-async";
import { BrowserRouter as Router } from 'react-router-dom';

const ErrorFallback = () => {
    return (
        <div
            className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
            <Button text={"Click me"} type={"danger"} onClick={() => window.location.assign(window.location.origin)}/>
        </div>
    );
};
type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense
            fallback={
                <div className="flex items-center justify-center w-screen h-screen">
                    <span>loading</span>
                </div>
            }
        >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <HelmetProvider>
                    <Router>{children}</Router>
                </HelmetProvider>
            </ErrorBoundary>
        </React.Suspense>
    );
};
