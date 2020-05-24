import React from 'react';
import { Link } from 'react-router-dom';

class AdminDashboard extends React.Component {
    render() {
        return (
            <div>
                Admin Dashboard
                <Link to="/users">Users</Link>
                <Link to="/admin/settings">Settings</Link>
            </div>
        );
    }
}

export default AdminDashboard;
