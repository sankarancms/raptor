import 'babel-polyfill';
import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import createStore from './store';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

class Client extends React.Component {
    render() {
        return (
            <Provider store={createStore('client')}>
                <BrowserRouter>
                    <div>{renderRoutes(Routes)}</div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Client;
