"use strict"
const Application = require('./lib/Application');

// Application initialization.
const app = new Application();

// Port configuration.
let port = getConfig('port');
app.setPort(process.env.PORT || port);

// Run the app server
app.runServer().then(() => {
    console.log(`Application started at port ${port}`);
}).catch(err => {
    // Error occured at starting up the app server.
    console.error(err);
});

