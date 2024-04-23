import { protectedRoutes } from './protected';

import {Landing} from "../pages/Landing";
import {useRoutes} from "react-router-dom";
import {publicRoutes} from "./public";

export const AppRoutes = () => {

    const commonRoutes = [{ path: '/', element: <Landing /> }];

    const routes =  protectedRoutes;
    const routes2 = publicRoutes;
    //const routes = auth.user ? protectedRoutes : publicRoutes;

    const element = useRoutes([...routes2, ...commonRoutes]);

    return <>{element}</>;
};
