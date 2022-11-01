const { response } = require("express");
require('dotenv').config(); //obtener variables de entorno
const jwt = require("jsonwebtoken");
const { SECRET_JWT_SEED } = process.env;


const jwtValidator = (req, res = response, next) => {

    //x-token header

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición"
        })
    }

    try {

        const {uid, name} = jwt.verify(token, SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "El token no es válido"
        })
    }

    next();
}

module.exports = {
    jwtValidator
}