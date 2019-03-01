'use strict';

require('express-async-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// View engine setup
app.engine('twig', require('atpl').__express);
app.set('devel', true);
app.set('view engine', 'twig');
app.set('view cache', false);
app.set('views', path.join(__dirname, 'views'));

// Middlewares
if ('production' !== app.get('env')) {
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./endpoints/index'));

// Error 404 - page not found
app.use(function(req, res) {
    res.status(404).render('_app/404');
});

// Error handler
app.use(function(err, req, res, next) {
    console.error(err);

    if (!res.headersSent) {
        res.status(err.status || 500).render('_app/error', {
            message: ('production' === req.app.get('env') || !err.message) ? 'Internal server error' : err.message,
            stack: 'production' === req.app.get('env') ? undefined : err.stack
        });
    }
});

module.exports = app;
