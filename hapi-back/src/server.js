'use strict';

const Hapi  = require('hapi');
const Jwt  = require('hapi-auth-jwt2');
const configJwt = require('../config/jwt');
const Auth = require('../routes/auth');


const init = async () => {

    const server = Hapi.server({
        port: 8080,
        host: 'localhost',
        routes: {
            cors: true,
        }
    });

    await server.register(Jwt); // register jwt with Hapi
    server.auth.strategy('jwt', 'jwt', configJwt);
    server.auth.default('jwt'); // Use JWT strategy by default

    server.route([
        Auth,
        {
            method: 'GET', path: '/api/companies',
            handler: function (request, h) {
                return ('Logged in request')
            }
        }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
