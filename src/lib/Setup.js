"use strict"
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
        console.log('Initializing setup');
        require('./index');
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
