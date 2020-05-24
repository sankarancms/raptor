import path from 'path';
import express from 'express';
import Database from './Database';
import './constants';
import './index';
import '../helpers';
import cors from 'cors';
import bodyParser from 'body-parser';
import passportFunction from './passport';
import passport from 'passport';
import models from '../api/models';
import controllers from '../api/controller';

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
    }

    /**
     * Setup initialization.
     */
    async init() {

        // Apply middlewares
        this.app.use(express.static('public'));
        this.app.use(express.static('dist'));
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

        await DB.connect()
            .then(() => log.success('Database connected'))
            .catch(log.error);

        // Models Sync
        Object.keys(models).forEach(model => {
            DB.model(model, models[model]);
        });

        // Controller Sync
        Object.keys(controllers).forEach((api) => {
            this.router(`/api/${api}`, controllers[api]);
        });

        // Post config
        await this.updateConfig();
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

    async updateConfig() {
        let Config = DB.model('configs');
        await Config.find().then((data) => {
            data.forEach(config => {
                global.CONF[config.name] = config.value;
            });
        });
    }

}

// Exporting setup class.
export default Setup;
