const express = require('express');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/usuarios';
        
        // Middlewares
        this.middleware();

        // Rutas de la app
        this.routes();
    }

    middleware(){
        // CORS
        this.app.use( cors());

        // Parseo y lectura del BODY
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user'));
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    };
}

module.exports = Server;