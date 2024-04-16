import * as React from 'react';


type ContentLayoutProps = {
    children: React.ReactNode;
};

export const ContentInnerContainer = ({ children}: ContentLayoutProps) => {
    return (
        <>
            <div className="bg-white rounded drop-shadow-sm">
                <div className="p-4">
                    {children}
                </div>
            </div>
        </>
    );
};
