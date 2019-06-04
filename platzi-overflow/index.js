'use strict';
const hapi = require('hapi');
const inert = require('inert');
const path = require('path');

//Intanciamos un servidor (Define las rutas de los archivos desde el directorio donde se encuentra hasta public)
const server = hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }
});

//Función para definir la ruta del servidor y arrancarlo
async function init()
{
    //Arranca el servidor
    try
    {
        //Definimos que vamos a usar el plugin de inert
        await server.register(inert);

        //El objeto h es una coleccion de utilidades y propiedades a la información de respuesta (importantes: h.response, h.redirect) de response se tienen response.header, response.type, response.code
        server.route({
            method: 'GET',
            path: '/home',
            handler: (request, h) => {
                //Regresa la respuesta con un codigo 200
                return h.file('index.html');
            }
        });

        //Nueva ruta que redirecciona
        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.',
                    index: ['index.html']
                }
            }
        });

        await server.start();
    }catch(error)
    {
        console.error(error);
        process.exit(1);
    }

    console.log(`Servidor lanzado en: ${server.info.uri}`);
}

init();