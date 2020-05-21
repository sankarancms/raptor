import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
            </Switch>
        );
    }
}


export default Routes;
