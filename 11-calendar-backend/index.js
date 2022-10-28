const express = require("express");
const auth = require('./routes/auth');
require('dotenv').config(); //obtener variables de entorno
const { PORT, DB_CNN } = process.env;
const { dbConnection } = require("./database/config");


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body

app.use(express.json());

//Rutas

app.use('/api/auth', auth);

//todo

console.log(DB_CNN)

//Escuchar peticiones

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});