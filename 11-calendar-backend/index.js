const express = require("express");
const auth = require('./routes/auth');
require('dotenv').config(); //obtener variables de entorno
const { PORT } = process.env;

//Crear el servidor de express
const app = express();

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body

app.use(express.json());

//Rutas

app.use('/api/auth', auth);

//todo



//Escuchar peticiones

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});