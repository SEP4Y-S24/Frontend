
import { Navigate, Outlet } from 'react-router-dom';
import {lazyImport} from "../utils/lazyImport";
import {MainLayout} from "../components/Layout";


const { Dashboard } = lazyImport(() => import('../pages/Dashboard'), 'Dashboard');
const { Messages } = lazyImport(() => import('../pages/Messages'), 'Messages');
const { Settings } = lazyImport(() => import('../pages/Settings'), 'Settings');

const App = () => {
    return (
        <MainLayout>
                <Outlet />
        </MainLayout>
    );
};

export const protectedRoutes = [
    {
        path: '',
        element: <App />,
        children: [
            { path: '/messages', element: <Messages /> },
            { path: '/settings', element: <Settings /> },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '*', element: <Navigate to="." /> },
        ],
    },
];
