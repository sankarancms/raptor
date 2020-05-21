import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <main role="main">
                    <div className="jumbotron">
                        <div className="container">
                            <h1 className="display-3">Raptor Framework!</h1>
                            <p>This is a Framework build with Nodejs and React. Raptor does server side render the react and integrated with MongoDB.</p>
                            <p><Link className="btn btn-primary btn-icon-split btn-lg" to="/raptor/doc" role="button">
                                <span className="icon text-white-50"><i className="fas fa-arrow-right"></i></span>
                                <span className="text">Learn more</span>
                            </Link></p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h2>About Node.js</h2>
                                <p>As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.</p>
                                <p><a className="btn btn-secondary btn-icon-split" href="https://nodejs.org/en/about/#about-node-js" role="button">
                                    <span className="icon text-white-50"><i className="fas fa-arrow-right"></i></span>
                                    <span className="text">Learn more</span>
                                </a></p>
                            </div>
                            <div className="col-md-4">
                                <h2>About React</h2>
                                <p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. </p>
                                <p><a className="btn btn-secondary btn-icon-split" href="https://reactjs.org/" role="button">
                                    <span className="icon text-white-50"><i className="fas fa-arrow-right"></i></span>
                                    <span className="text">Learn more</span>
                                </a></p>
                            </div>
                            <div className="col-md-4">
                                <h2>SSR</h2>
                                <p>An Introduction to React Server-Side Rendering. Server-side rendering (SSR) is a popular technique for rendering a normally client-side only single page app (SPA) on the server and then sending a fully rendered page to the client. The client's JavaScript bundle can then take over and the SPA can operate as normal.</p>
                                <p><Link className="btn btn-secondary btn-icon-split" to="/raptor/about" role="button">
                                    <span className="icon text-white-50"><i className="fas fa-arrow-right"></i></span>
                                    <span className="text">Learn more</span>
                                </Link></p>
                            </div>
                        </div>
                        <hr />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Home;
