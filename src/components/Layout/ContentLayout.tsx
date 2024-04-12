import {NavLink} from "react-router-dom";
import clsx from "clsx";

type SideNavigationItem = {
    name: string;
    to: string;
};

const SideNavigation = () => {
    const navigation = [
        { name: 'Dashboard', to: '.'},
        { name: 'Messages', to: './messages'},
        { name: 'Settings', to: './settings'},
    ].filter(Boolean) as SideNavigationItem[];

    return (
        <>
            {navigation.map((item, index) => (
                <NavLink
                    end={index === 0}
                    key={item.name}
                    to={item.to}
                    className={clsx(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    )}

                >
                    {item.name}
                </NavLink>
            ))}
        </>
    );
};
