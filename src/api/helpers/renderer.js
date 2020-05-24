import React from 'react';
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import App from './App';
import createStore from './store';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import Routes from './Routes';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';

let store = createStore('server');
const renderer = (context = {}, url = '/', callback) => {
    const promises = matchRoutes(Routes, url)
        .map(({ route }) => {
            return route.loadData ? route.loadData(store) : null;
        }).map(promise => {
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve);
                });
            }
        });

    Promise.all(promises).then(async () => {
        const app = await ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter context={context} location={url}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        const helmet = Helmet.renderStatic();
        let markUp =
            `<html>
                <head>
                  ${helmet.title.toString()}
                  ${helmet.meta.toString()}
                    <link href="/vendor/fontawesome-free/css/all.min.css" 
                    rel="stylesheet" type="text/css" />
                    <link href="/css/custom.css" rel="stylesheet" />
                    <link href="/css/App.css" rel="stylesheet" />
                </head>
                <body>
                  <div id="root">${app}</div>
                  <script>
                    window.INITIAL_STATE = ${serialize(store.getState())}
                  </script>
                  <script src="/bundle.main.js"></script>
                  <script src="/vendor/jquery/jquery.min.js"></script>
                  <script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                  <script src="/vendor/jquery-easing/jquery.easing.min.js"></script>
                  <script type="text/javascript" src="/js/App.js"></script>
                </body>
              </html>`;
        callback(null, markUp);
    });
};

export default renderer;