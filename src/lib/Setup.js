"use strict"
const figlet = require('figlet');
const { Database } = require('./Database.js');

/**
 * Setup application.
 */
class Setup {

    /**
     * Setup constructor.
     * @param {*} app express application
     */
    constructor(app) {
        this.app = app;
        this.init();
    }

    /**
     * Setup initialization.
     */
    init() {
        require('./index');

        console.log(figlet.textSync('RAPTOR', {
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }));

        log.default('Initializing setup');

        // Setting up environment
        if (getConfig('ENV') == 'development') {
            process.env.NODE_ENV = 'development';
        } else {
            process.env.NODE_ENV = 'production';
        }

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
    }

    /**
     * Router setup.
     * @param {*} router application router
     */
    router(path = '/', router) {
        this.app.use(path, router)
        return this.app;
    }
}

// Exporting setup class.
module.exports = Setup;
