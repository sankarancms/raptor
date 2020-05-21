import express from 'express';
import Setup from './Setup';
import router from '../routes';

import Renderer from '../helpers/Renderer';

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

        this.app.get('*', (req, res, next) => {
            Renderer({}, req.path, (err, markUp) => {
                if (err) {
                    log.error(err);
                    return res.status(500).json({ success: false, message: 'Internal Server Error' });
                }
                return res.status(200).send(markUp);
            });
        });
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
                    log.info(`Application running at http://localhost:${this.port}`);
                }
                resolve();
            });
        });
    }

}

// Exporting application.
export default Application;
