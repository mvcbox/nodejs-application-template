'use strict';

module.exports = {
    pool: true,
    host: process.env.NODEMAILER_HOST || 'smtp.gmail.com',
    port: process.env.NODEMAILER_PORT || 465,
    secure: process.env.NODEMAILER_SECURE !== undefined ? !!(+process.env.NODEMAILER_SECURE) : true, // use TLS
    auth: {
        user: process.env.NODEMAILER_AUTH_USER || 'user@gmail.com',
        pass: process.env.NODEMAILER_AUTH_PASS || 'password'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
};
