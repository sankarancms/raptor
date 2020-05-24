import React from 'react';
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import App from '../api/views/App';


const renderer = (context = {}, url = '/',
    callback = (err, html) => { }) => {
    const app = ReactDOMServer.renderToString(
        <StaticRouter context={context} location={url}>
            <App />
        </StaticRouter>
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
};

export default renderer;