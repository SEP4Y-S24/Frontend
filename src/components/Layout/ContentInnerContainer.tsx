import * as React from 'react';


type ContentLayoutProps = {
    children: React.ReactNode;
    className: string;
};

function classNames(...classes : string []) {
    return classes.filter(Boolean).join(' ')
  }
  

export const ContentInnerContainer = ({ children, className}: ContentLayoutProps) => {
    return (
        <>
            <div className={classNames("bg-white rounded drop-shadow-sm", className)}>
                <div className="p-4 ">
                    {children}
                </div>
            </div>
        </>
    );
};
//""