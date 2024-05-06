import {Dialog, Menu, Transition} from '@headlessui/react';
import {
    XMarkIcon,
    Bars4Icon,


} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import * as React from 'react';
import {NavLink, Link} from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import {useLogout, useUser} from "../../lib/auth";
import Heading from "../Elements/Headings/Heading";


type SideNavigationItem = {
    name: string;
    to: string;
};

const SideNavigation = () => {

    const navigation = [
        {name: 'Dashboard', to: '.'},
        {name: 'Messages', to: './messages'},
        {name: 'Calendar', to: './calendar'},
        {name: 'Events', to: './events'},
        {name: 'Tasks', to: './tasks'},
        {name: 'Statistics', to: './statistics'},
        {name: 'Alarm', to: './alarm'},
        {name: 'Timer', to: './timer'},
        {name: 'Contacts', to: './contacts'},
        {name: 'About us', to: './about'},
        {name: 'Settings', to: './settings'},
    ].filter(Boolean) as SideNavigationItem[];

    return (
        <>
            {navigation.map((item, index) => (
                <div className=' flex items-center px-2 py-2  rounded-md hover:bg-primaryColorOpacity' key={item.name}>
                    <NavLink
                        end={index === 0}
                        to={item.to}
                        className={clsx(
                            'pl-5 text-primaryText text-sm font-medium focus:text-primaryColor',
                        )}
                    >
                        <div>
                            {item.name}
                        </div>

                    </NavLink>
                </div>

            ))}
        </>
    );
};

type UserNavigationItem = {
    name: string;
    to: string;
    onClick?: () => void;
};

const UserNavigation = () => {

    const logout = useLogout();

    const userNavigation = [
        {name: 'Your Profile', to: './profile'},
        {
            name: 'Sign out',
            to: '',
            onClick: () => {
                logout.mutate({});
                console.log('Sign out');
            },
        },
    ].filter(Boolean) as UserNavigationItem[];
    const user = useUser();
    const userName = user.data?.email;


    return (
        <Menu as="div" className="ml-3 relative">
            {({open}) => (
                <>
                    <div>
                        <Menu.Button
                            className="max-w-xs p-2 flex items-center text-sm rounded-full focus:outline-none ">
                            <div className='grid grid-cols-1 pr-4'>
                                <div><span className='text-dark font-medium'>{userName}</span></div>
                                <div><span className='text-xs text-primaryText'>Clock user</span></div>
                            </div>
                            <div className='rounded-3xl max-w-10 max-h-10'>
                                <img alt='userAvatar' className='rounded-full'
                                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyG6nAdKXe4OsY7Un96eqGuC7XxxSBaUKZQ&usqp=CAU"/>
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        show={open}
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white "
                        >
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({active}) => (
                                        <Link
                                            onClick={item.onClick}
                                            to={item.to}
                                            className={clsx(
                                                'block px-4 py-2 text-sm text-primaryText font-medium hover:bg-primaryColorOpacity hover:text-primaryColor',
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
};

type MobileSidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileSidebar = ({sidebarOpen, setSidebarOpen}: MobileSidebarProps) => {
    return (
        <Transition.Root show={sidebarOpen} as={React.Fragment}>
            <Dialog
                as="div"
                static
                className="fixed inset-0 flex z-40 md:hidden"
                open={sidebarOpen}
                onClose={setSidebarOpen}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
                </Transition.Child>
                <Transition.Child
                    as={React.Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div className="relative flex-1 flex flex-col max-w-48 pt-5 pb-4 bg-gray-800">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute top-2 right-0 -mr-12 pt-2">
                                <button
                                    className="ml-1 flex items-center justify-center h-10 w-5"
                                    onClick={() => setSidebarOpen(false)}
                                ><XMarkIcon className="h-5 w-5 text-stroke" aria-hidden="true"/>
                                </button>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 flex items-center px-4 bg-white">
                            <Logo/>
                        </div>
                        <div className="mt-5 flex-1 h-0 overflow-y-auto bg-white">
                            <nav className="px-2 space-y-1 ">
                                <SideNavigation/>
                            </nav>
                        </div>
                        <div className="flex flex-col h-16 flex-shrink-0 px-4 bg-white">
                            <Heading text={"Kabelikova"} type={"heading2"}/>
                            <Heading text={"Id:123"} type={"heading4"}/>
                        </div>
                    </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true"/>
            </Dialog>
        </Transition.Root>
    );
};

const Sidebar = () => {
    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-56">
                <div className="flex flex-col h-0 flex-1">
                    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                        <Logo/>
                    </div>
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
                            <SideNavigation/>
                        </nav>
                    </div>
                    <div className="flex flex-col h-16 flex-shrink-0 px-4 bg-gray-900">
                        <Heading text={"Kabelikova"} type={"heading2"}/>
                        <Heading text={"Id:123"} type={"heading4"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Logo = () => {
    return (
        <Link className="flex items-center text-white" to=".">
            <img className="h-8 w-auto" src={logo} alt="Workflow"/>
        </Link>
    );
};

type MainLayoutProps = {
    children: React.ReactNode;
};

export const MainLayout = ({children}: MainLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            <Sidebar/>
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        className="px-4 border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars4Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                    <div className="flex-1 px-4 flex justify-end">
                        <div className="ml-4 flex items-center md:ml-6">
                            <UserNavigation/>
                        </div>
                    </div>
                </div>
                <main className="flex-1 bg-background relative overflow-y-auto focus:outline-none">{children}</main>
            </div>
        </div>
    );
};
