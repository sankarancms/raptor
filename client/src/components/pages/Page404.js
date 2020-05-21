import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const Page404 = ({ location }) => (
    <div>
        <Header />
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-3">Error 404</h1>
                <h2>No match found for <code>{location.pathname}</code></h2>
                <p><Link className="btn btn-primary btn-icon-split btn-lg" to="/" role="button">
                    <span className="icon text-white-50"><i className="fas fa-arrow-right"></i></span>
                    <span className="text">Go back</span>
                </Link></p>
            </div>
        </div>
        <Footer />
    </div>
);

export default Page404;
