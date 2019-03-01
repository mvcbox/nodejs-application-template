'use strict';

const path = require('path');

module.exports = {
    client: 'pg',
    connection: {
        host: process.env.KNEX_DB_HOST || '127.0.0.1',
        user: process.env.KNEX_DB_USER || 'root',
        password: process.env.KNEX_DB_PASSWORD || 'root',
        database: process.env.KNEX_DB_DATABASE || 'dbname'
    },
    pool: {
        min: 1,
        max: 5
    },
    migrations: {
        directory: path.normalize(`${__dirname}/../database/migrations`),
        tableName: '_knex_migrations',
    },
    seeds: {
        directory: path.resolve(`${__dirname}/../database/seeds`)
    }
};
