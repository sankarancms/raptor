"use strict"
const express = require('express');
const Setup = require('./Setup');
const router = require('../routes');


/**
 * Core Application
 */
class Application {

    /**
     * Application Constructor
     */
    constructor() {
        this.app = express();
        this.port = 0;
        this.setup = new Setup(this.app);
        this.init();
    }

    /**
     * Initialize the appliation.
     */
    init() {
        console.log('Application initializing.');
        this.app = this.setup.router('/', router);
    }

    /**
     * Set port
     * @param {int} port 
     */
    setPort(port = 0) {
        this.port = port;
    }

    /**
     * To start up the app server.
     */
    runServer() {
        return new Promise((resolve, reject) => {
            if (this.port == null || this.port <= 0) {
                reject('Wrong port number configuration');
                return;
            }
            this.app.listen(this.port, () => {
                resolve();
            });
        });
    }

}

// Exporting application.
module.exports = Application;
