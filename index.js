import server from './src/server';

process.on('exit', code => {
    console.log(`Application about to stop. Error code: ${code}`);
    return;
});

server()
    .then(() => log.success('Application Started'))
    .catch(log.error);
