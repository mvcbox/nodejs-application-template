'use strict';

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    req.headers['test-header'] = 'Test Header';
    next();
};
