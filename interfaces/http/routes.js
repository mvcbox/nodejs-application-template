'use strict';

module.exports = require('express').Router({
    caseSensitive: true,
    mergeParams: true
});

module.exports.use('/', require('./endpoints/index/index'));
