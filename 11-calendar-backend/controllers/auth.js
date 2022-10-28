const { response } = require('express');
const User = require('../models/User');

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
        // const { name, email, password } = req.body;

        const user = new User(req.body);
       const resp = await user.save();

console.log(await resp)

        res.status(201).json({
            ok: true,
            msg: 'register',
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