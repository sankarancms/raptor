"use strict"
const server = require('./src/server');

server.run()
    .then(() => log.success('Application Started'))
    .catch(log.error);
