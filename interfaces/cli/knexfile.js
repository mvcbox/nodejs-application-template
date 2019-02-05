'use strict';

module.exports = {
    development: require('../../config/knex'),
    production: require('../../config/knex'),
    staging: require('../../config/knex'),
    test: require('../../config/knex')
};
