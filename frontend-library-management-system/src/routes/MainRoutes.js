import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const Records = Loadable(lazy(() => import('views/records')));
const Books = Loadable(lazy(() => import('views/books')));
const Students = Loadable(lazy(() => import('views/students')));
const Users = Loadable(lazy(() => import('views/users')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'Records',
            element: <Records />
        },
        {
            path: 'Books',
            element: <Books />
        },
        {
            path: 'Students',
            element: <Students />
        },
        {
            path: 'Users',
            element: <Users />
        }
    ]
};

export default MainRoutes;
