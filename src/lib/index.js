const fs = require('fs');
const os = require('os');

/**
 * Directory
 * @param {string} path
 * @returns {string} full path.
 */
global.directory = (path) => {
    const homeDirectory = os.homedir();
    if (path) {
        homeDirectory += '/' + path;
    }
    return homeDirectory;
};

/**
 * Global function getConfig.
 * Read the config value.
 * @param {string} name Name of the config.
 * @param {string} mod Module of the config.
 * @returns {any} config value.
 */
global.getConfig = (name, mod = 'core') => {
    if (mod == 'core' && process.env[name.toUpperCase()]) {
        return process.env[name.toUpperCase()];
    } else if (mod == 'core' && fs.existsSync(__dirname + '/../../config.json')) {
        const config = require('../../config.json');
        if (config[name.toUpperCase()] != null) {
            return config[name.toUpperCase()];
        }
    }
}

