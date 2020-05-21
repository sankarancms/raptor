import React from 'react';
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';

import App from '../../client/src/App';


const Renderer = (context = {}, url = '/',
    callback = (err = new Error(), html = '') => { }) => {
    const app = ReactDOMServer.renderToString(
        <StaticRouter context={context} location={url}>
            <App />
        </StaticRouter>
    );
    const indexFile = path.resolve('public', 'main.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            callback(err, false);
        } else {
            callback(null, data.replace('<div id="root"></div>',
                `<div id="root">${app}</div>`));
        }
    });
};

export default Renderer;