/*jshint esversion: 6 */
// CONFIG
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const exphbs = require('express-handlebars');
const compression = require('compression');
const config = require('./src/server/config/config');
const cookieParser = require('cookie-parser');
const routes = require('./src/server/routes/index');
const nodemailer = require('./src/server/email/emailTransporter');
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
const environment = process.env.NODE_ENV;
// view engine setup
const hbs = exphbs.create({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir:'views',
    partialsDir: 'views'
});
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(compression({ threshold: 0 }));
app.set('port', port);
app.use('/', express.static(__dirname, '/src/client/', {
    maxage: '1y'
}));
app.use('/', routes);
app.use('/portfolio', routes);
/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
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
    if (error.syscall !== 'listen') {
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
    console.log('Cajek App Ready');
    console.log('Listening on ' + bind);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
