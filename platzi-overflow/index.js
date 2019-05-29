'use strict';
const hapi = require('hapi');

//Intanciamos un servidor
const server = hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
});

//Función para definir la ruta del servidor y arrancarlo
async function init()
{
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hola mundo'
        }
    });

    //Arranca el servidor
    try
    {
        await server.start();
    }catch(error)
    {
        console.error(error);
        process.exit(1);
    }

    console.log(`Servidor lanzado en: ${server.info.uri}`);
}

init();