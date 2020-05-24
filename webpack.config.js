const path = require("path");
const CONF = require('./config');

const webpackConfig = (entry, name, target, path) => {
    return {
        entry,
        target,
        output: {
            path,
            filename: `bundle.${name}.js`
        },
        mode: CONF.ENV,
        module: {
            rules: [
                {
                    test: /\.jsx?/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"]
                    }
                }
            ]
        }
    };
};

const clientEntry = path.resolve(__dirname, "src", "index.js");
const clientPath = path.resolve(__dirname, "dist");
const clientConfig = webpackConfig(clientEntry, "main", "web", clientPath);

const serverEntry = path.resolve(__dirname, "index.js");
const serverPath = path.resolve(__dirname, "build");
const serverConfig = webpackConfig(serverEntry, "server", "node", serverPath);

/**
 * First drawback, we need to transpile our server code when we could
 * have kept it as standard JavaScript.
 */
module.exports = [serverConfig, clientConfig];
