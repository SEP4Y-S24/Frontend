import * as React from 'react';
type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <div className="min-h-screen bg-background flex flex-col justify-center sm:px-4 lg:px-6">

                <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white drop-shadow-sm py-8 px-4 sm:rounded-lg sm:px-10">{children}</div>
                </div>
            </div>
        </>
    );
};
