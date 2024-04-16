import * as React from 'react';


type ContentLayoutProps = {
    children: React.ReactNode;
};

export const ContentLayout = ({ children}: ContentLayoutProps) => {
    return (
        <>
           <div className="m-5">
               {children}
           </div>
        </>
    );
};
