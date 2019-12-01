"use strict"
const express = require('express');
const open = require('open');
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
        log.default('Application initializing');
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
    run() {
        return new Promise((resolve, reject) => {
            if (this.port == null || this.port <= 0) {
                reject('Wrong port number configuration');
                return;
            }
            this.app.listen(this.port, () => {
                if (process.env.NODE_ENV == 'development') {
                    open(`http://localhost:${this.port}`);
                    log.info(`Application running at http://localhost:${this.port}`);
                }
                resolve();
            });
        });
    }

}

// Exporting application.
module.exports = Application;
