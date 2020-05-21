import express from 'express';
import Database from './Database';
import './index';
import cors from 'cors';
import bodyParser from 'body-parser';
import passportFunction from './passport';
import passport from 'passport';

const Express = express();

/**
 * Setup application.
 */
class Setup {

    /**
     * Setup constructor
     * @param {*} app Express application
     */
    constructor(app = Express) {
        this.app = app;
        this.init();
    }

    /**
     * Setup initialization.
     */
    init() {
        this.app.use(express.static('public'));

        this.app.use(cors());

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        log.default('Initializing setup');

        // Database connnection
        global.DB = new Database({
            host: getConfig('DB_HOST'),
            port: getConfig('DB_PORT'),
            name: getConfig('DB_NAME'),
            user: getConfig('DB_USER'),
            password: getConfig('DB_PASS')
        });

        DB.connect()
            .then(() => log.success('Database connected'))
            .catch(log.error);

        passportFunction(passport);

    }

    /**
     * Router setup.
     * @param {*} router application router
     */
    router(path = '/', router) {
        this.app.use(path, router);
        return this.app;
    }
}

// Exporting setup class.
export default Setup;
