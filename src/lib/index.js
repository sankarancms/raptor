"use strict"
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');

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

global.isEmpty = (value) => {
    if (value == '' || value == 0 || value == undefined || value == null) {
        return true;
    }
    return false;
}

global.trueCasePathSync = (fsPath) => {

    var glob = require('glob')
    var path = require('path')

    // Normalize the path so as to resolve . and .. components.
    // !! As of Node v4.1.1, a path starting with ../ is NOT resolved relative
    // !! to the current dir, and glob.sync() below then fails.
    // !! When in doubt, resolve with fs.realPathSync() *beforehand*.
    var fsPathNormalized = path.normalize(fsPath)

    // OSX: HFS+ stores filenames in NFD (decomposed normal form) Unicode format,
    // so we must ensure that the input path is in that format first.
    if (process.platform === 'darwin') fsPathNormalized = fsPathNormalized.normalize('NFD')

    // !! Windows: Curiously, the drive component mustn't be part of a glob,
    // !! otherwise glob.sync() will invariably match nothing.
    // !! Thus, we remove the drive component and instead pass it in as the 'cwd' 
    // !! (working dir.) property below.
    var pathRoot = path.parse(fsPathNormalized).root
    var noDrivePath = fsPathNormalized.slice(Math.max(pathRoot.length - 1, 0))

    // Perform case-insensitive globbing (on Windows, relative to the drive / 
    // network share) and return the 1st match, if any.
    // Fortunately, glob() with nocase case-corrects the input even if it is 
    // a *literal* path.
    return glob.sync(noDrivePath, { nocase: true, cwd: pathRoot })[0]
}

// Custom logger
global.log = {
    error: (msg) => {

        // Checking for error
        if (typeof msg == 'object' && msg.hasOwnProperty('stack')) {
            msg = msg.stack;
        } else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        console.log(`[${new Date().toLocaleString()}] ` + chalk.red(msg));
    },
    warn: (msg) => {

        // Checking for error
        if (typeof msg == 'object' && msg.hasOwnProperty('stack')) {
            msg = msg.stack;
        } else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        console.log(`[${new Date().toLocaleString()}] ` + chalk.yellow(msg));
    },
    default: (msg) => {

        // Checking for error
        if (typeof msg == 'object' && msg.hasOwnProperty('stack')) {
            msg = msg.stack;
        } else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        console.log(`[${new Date().toLocaleString()}] ` + msg);
    },
    success: (msg) => {

        // Checking for error
        if (typeof msg == 'object' && msg.hasOwnProperty('stack')) {
            msg = msg.stack;
        } else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        console.log(`[${new Date().toLocaleString()}] ` + chalk.green(msg));
    },
    info: (msg) => {

        // Checking for error
        if (typeof msg == 'object' && msg.hasOwnProperty('stack')) {
            msg = msg.stack;
        } else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        console.log(`[${new Date().toLocaleString()}] ` + chalk.blue(msg));
    }
};
