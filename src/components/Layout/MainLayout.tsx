import {NavLink} from "react-router-dom";
import clsx from "clsx";
import SideNavigation from "./SideNavigation";
import React from "react";

type SideNavigationItem = {
    name: string;
    to: string;
};
type MainLayoutProps = {
    children: React.ReactNode;
};
export const MainLayout = ({ children }: MainLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <SideNavigation/>
    );
};
