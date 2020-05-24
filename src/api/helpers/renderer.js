import React from 'react';
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import App from './App';
import createStore from './store';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import Routes from './Routes';


const renderer = (context = {}, url = '/', callback) => {
    let store = createStore('server');
    const promises = matchRoutes(Routes, url).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    }).map(promise => {
        if (promise) {
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve);
            });
        }
    });

    Promise.all(promises).then(() => {
        const app = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter context={context} location={url}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        const indexFile = path.resolve('public', 'index');
        fs.readFile(indexFile, 'utf8', (err, data) => {
            if (err) {
                callback(err, '');
            } else {
                let markUp = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
                markUp = markUp.replace('<title id="title"></title>', `<title id="title">${CONF.SITE_NAME}</title>`);
                callback(null, markUp);
            }
        });
    }).catch(err => { throw err });
};

export default renderer;