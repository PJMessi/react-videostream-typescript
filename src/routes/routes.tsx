import { FC } from 'react';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login';

type Route = {
    path: string
    component: FC
    isPrivate: boolean
}

const routes: Route[] = [
    {
        path: '/login',
        component: Login,
        isPrivate: false
    },
    {
        path: '/',
        component: Dashboard,
        isPrivate: true
    }
];

export default routes;