import React, {ReactNode, useState} from "react";

interface TabProps {
    label: string;
    children: ReactNode;
}

export const Tabs: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const changeTab = (index: number) => {
        setActiveTab(index);
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
              onClick={() => changeTab(index)}
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
