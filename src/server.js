"use strict"
const Application = require('./lib/Application');

// Application initialization.
const app = new Application();

// Port configuration.
let port = getConfig('port');
app.setPort(process.env.PORT || port);

// Run the app server
module.exports.run = () => {
    return app.run();
}
