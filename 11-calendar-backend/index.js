const express = require("express");
const auth = require('./routes/auth');
const cors = require("cors");
require('dotenv').config(); //obtener variables de entorno
const { PORT } = process.env;
const { dbConnection } = require("./database/config");


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS

app.use(cors());

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