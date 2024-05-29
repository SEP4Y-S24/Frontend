import React, { useState, ReactNode } from 'react';

interface TabProps {
    label: string;
    children: ReactNode;
}

interface TabsProps {
    children: ReactNode;
    onTabChange: (label: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ children, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(0);

    const changeTab = (index: number, label: string) => {
        setActiveTab(index);
        onTabChange(label); 
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-wrap mb-4">
                {React.Children.map(children, (child, index) => {
                    const tab = child as React.ReactElement<TabProps>;
                    return (
                        <button
                            key={index}
                            className={`mr-4 mb-2 px-4 py-2 rounded focus:outline-none ${
                                activeTab === index
                                    ? 'bg-primaryColor text-white'
                                    : 'bg-white text-dark'
                            }`}
                            onClick={() => changeTab(index, tab.props.label)}
                        >
                            {tab.props.label}
                        </button>
                    );
                })}
            </div>
            <div>{React.Children.toArray(children)[activeTab]}</div>
        </div>
    );
};

export const Tab: React.FC<TabProps> = ({ children }) => {
    return <>{children}</>;
};
