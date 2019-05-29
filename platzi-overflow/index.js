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
    //El objeto h es una coleccion de utilidades y propiedades a la información de respuesta (importantes: h.response, h.redirect) de response se tienen response.header, response.type, response.code
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            //Regresa la respuesta con un codigo 200
            return h.response('Hola mundo...').code(200);
        }
    });

    //Nueva ruta que redirecciona
    server.route({
        method: 'GET',
        path: '/redirect',
        handler: (request, h) => {
            //Regresa la respuesta con un codigo 200
            return h.redirect('https://platzi.com');
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