const { response } = require('express');
const User = require('../models/User');
const bcrypt = require("bcryptjs");

const loginUser = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
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
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

};

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
};

module.exports = {
    loginUser,
    createUser,
    renewToken
}