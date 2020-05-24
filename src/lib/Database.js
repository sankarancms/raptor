import { Mongoose } from 'mongoose';

const DatabaseParameters = {
    host: '',
    port: 0,
    name: '',
    user: '',
    password: ''
}

const DatabaseSettings = {
    host: {
        type: 'string',
        required: true
    },
    port: {
        type: 'number',
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    user: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
}

class Database extends Mongoose {
    constructor(databaseParameters = DatabaseParameters) {
        super()
        this.host = databaseParameters.host;
        this.port = databaseParameters.port;
        this.name = databaseParameters.name;
        this.user = databaseParameters.user;
        this.password = databaseParameters.password;
        this.isConnected = false;
    }

    getConmectionString() {
        return `mongodb://${this.host}:${this.port}/${this.name}`;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.validateConnectionSettings();
            let connectionString = this.getConmectionString();
            super.connect(connectionString, { user: this.user, pass: this.password, useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
                this.isConnected = true;
                resolve(); // Database connection estabilished.
            }).catch(err => {
                throw new DatabaseException(err.message); // Auto reject the promise.
            });
        });
    }

    validateConnectionSettings() {
        let error = null;
        for (let dbParamKey in DatabaseSettings) {
            if (DatabaseSettings.hasOwnProperty(dbParamKey)) {
                if (!this.validate(dbParamKey, DatabaseSettings[dbParamKey].type)) {
                    error = new DatabaseException(`Invalid database parameter ${dbParamKey}`);
                    break;
                }
            }
        }
        if (!this.isEmpty(error)) {
            throw error;
        }
    }

    validate(dbParamKey, type) {
        if (DatabaseSettings[dbParamKey].required) {
            if (typeof this[dbParamKey] != type) {
                return false;
            } else if (this.isEmpty(this[dbParamKey])) {
                return false;
            }
        }
        return true;
    }

    isEmpty(value) {
        if (value == '' || value == 0 || value == undefined || value == null) {
            return true;
        }
        return false;
    }

    checkConnection() {
        return this.isConnected;
    }
}

class DatabaseException extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseException);
        }
    }
}

export default Database;
