import 'babel-polyfill';
import express from 'express';
import Setup from './Setup';

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
    }

    /**
     * Initialize the appliation.
     */
    async init() {
        this.setup = new Setup(this.app);
        await this.setup.init()
        log.default('Application initializing');
        this.app.get('*', (req, res, next) => {
            helpers.renderer({}, req.path, (err, markUp) => {
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
        return new Promise(async (resolve, reject) => {
            await this.init();
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
