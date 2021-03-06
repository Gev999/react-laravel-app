'use strict';

const path = require('path');
require('app-module-path').addPath(path.join(__dirname, '../'));

const Hapi  = require('hapi');
const configJwt = require('config/jwt');
const Routes = require('routes');

const init = async () => {

    const server = Hapi.server({
        port: 8080,
        host: 'localhost',
        routes: {
            cors: true,
        }
    });


    await server.register([
        require('hapi-auth-jwt2'), 
        require('@hapi/inert')
    ]); // register jwt with Hapi
    
    server.auth.strategy('jwt', 'jwt', configJwt);
    server.auth.default('jwt'); // Use JWT strategy by default

    server.route([
        ...Routes,
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
