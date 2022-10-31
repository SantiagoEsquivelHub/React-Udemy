
const mongoose = require('mongoose');

const db_user = 'santiago';
const db_password = 'FwJBnqTPeCwhurvs';

const { DB_CNN } = process.env;


const dbConnection = async () => {

    try {

        await mongoose.connect(DB_CNN);
        console.log('DB online');


    } catch (error) {
        console.log(error)
        throw new Error('Error al conectarse a base de datos!')
    }

}

module.exports = {
    dbConnection
}