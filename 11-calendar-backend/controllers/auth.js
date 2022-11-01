const { response } = require('express');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');

const loginUser = async (req, res = response) => {

    try {

        const { email, password } = req.body;

        //Looking for user with email entered

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario eno xiste con este correo',
            })
        }

        //Checking the password

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(500).json({
                ok: false,
                msg: "Password incorrecto"
            })
        }


        //Generating JWT

        const token = await generateJWT(user._id, user.name);

        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token: token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }
};


const createUser = async (req, res = response) => {

    try {

        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: true,
                msg: 'Un usuario existe con este correo',
            })
        }

        user = new User(req.body);

        //Encriptar contraseña

        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(password, salt);

        await user.save();


        res.status(201).json({
            ok: true,
            uid: user._id,
            name: usuario.name,
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

};

const renewToken = async (req, res = response) => {

    const { uid, name } = req;

    //Generate a new JWT and and return it in this request

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        msg: 'renew',
        uid,
        name,
        newToken: token
    })
};

module.exports = {
    loginUser,
    createUser,
    renewToken
}