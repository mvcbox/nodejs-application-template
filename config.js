'use strict';

const path = require('path');

module.exports = {
    // Application interfaces
    interfaces: {
        http: {
            listen: {
                host: process.env.INTERFACE_HTTP_LISTEN_HOST || '127.0.0.1',
                port: parseInt(process.env.INTERFACE_HTTP_LISTEN_PORT, 10) || 3000
            }
        }
    },

    // https://knexjs.org/
    knex: {
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
            directory: path.normalize(`${__dirname}/database/migrations`),
            tableName: '_knex_migrations',
        },
        seeds: {
            directory: path.resolve(`${__dirname}/database/seeds`)
        }
    },

    // https://nodemailer.com/
    nodemailer: {
        pool: true,
        host: process.env.NODEMAILER_HOST || 'smtp.gmail.com',
        port: process.env.NODEMAILER_PORT || 465,
        secure: true, // use TLS
        auth: {
            user: process.env.NODEMAILER_AUTH_USER || 'user@gmail.com',
            pass: process.env.NODEMAILER_AUTH_PASS || 'password'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    }
};
