import Application from './lib/Application';

// Application initialization.
const app = new Application();

// Port configuration.
let port = getConfig('port');
app.setPort(process.env.PORT || port);

// Run the app server
export default function run() {
    return app.run();
}
