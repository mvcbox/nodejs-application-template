'use strict';

// HTTP interface bootstrapping
require('./bootstrap/index');

const app = require('./app');
const debug = require('debug')('src:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.INTERFACE_HTTP_LISTEN_PORT || 8000);
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, process.env.INTERFACE_HTTP_LISTEN_HOST || '127.0.0.1');
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if ('listen' !== error.syscall) {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

/**
 *
 */
function gracefulShutdown() {
    server.close(function() {
        // Closed out remaining connections
        process.exit();
    });

    setTimeout(function() {
        // Could not close connections in time, forcefully shutting down
        process.exit();
    }, 30000);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
