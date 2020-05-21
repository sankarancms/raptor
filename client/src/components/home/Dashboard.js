import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Dashboard</h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        );
    }
}

export default Dashboard;
