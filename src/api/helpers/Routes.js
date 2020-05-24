import Home from '../views/home/Home';
import UsersList from '../views/users/UsersList';
import AdminDashboard from '../views/admin/AdminDashboard';
import AdminSettings from '../views/admin/Settings';

export default [
    {
        component: Home,
        path: '/',
        exact: true
    },
    {
        ...UsersList,
        path: '/users',
        exact: true
    },
    {
        component: AdminDashboard,
        path: '/admin',
        exact: true
    },
    {
        path: '/admin/settings',
        ...AdminSettings,
        exact: true
    }
];
