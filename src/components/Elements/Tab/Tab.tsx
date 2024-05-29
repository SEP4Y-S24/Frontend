import React, { useState, ReactNode, useEffect } from 'react';

interface TabProps {
    label: string;
    children: ReactNode;
}

interface TabsProps {
    children: ReactNode;
    tab : number
    setTab: React.Dispatch<React.SetStateAction<number>>;
   
}

export const Tabs: React.FC<TabsProps> = ({ children,tab,setTab  }) => {
    




    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-wrap mb-4">
                {React.Children.map(children, (child, index) => {
                    const tabr = child as React.ReactElement<TabProps>;
                    return (
                        <button
                            key={index}
                            className={`mr-4 mb-2 px-4 py-2 rounded focus:outline-none ${
                                tab === index
                                    ? 'bg-primaryColor text-white'
                                    : 'bg-white text-dark'
                            }`}
                            onClick={() =>  setTab(index)
                                
                            }
                        >
                            {tabr.props.label}
                        </button>
                    );
                })}
            </div>
            <div>{React.Children.toArray(children)[tab]}</div>
        </div>
    );
};
export const Tab: React.FC<TabProps> = ({ children }) => {
    return <>{children}</>;
};
