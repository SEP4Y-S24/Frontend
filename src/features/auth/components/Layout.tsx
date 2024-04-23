import * as React from 'react';

import {Link} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";




type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">

                        <Link className="flex items-center text-primaryText" to="/">
                            <ArrowLeftIcon className="h-6 w-6 text-primaryText pr-2" aria-hidden="true" />
                          Go back to landing page
                        </Link>
                    </div>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white drop-shadow-sm py-8 px-4 sm:rounded-lg sm:px-10">{children}</div>
                </div>
            </div>
        </>
    );
};
