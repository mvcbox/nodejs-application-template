'use strict';

const route = module.exports = require('express').Router({
    caseSensitive: true,
    mergeParams: true
});

route.use('/', require('./home/index'));
