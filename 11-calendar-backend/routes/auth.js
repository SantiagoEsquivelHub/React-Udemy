const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser, createUser, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidator');
const router = Router();

/* 
Rutas de Usuarios / Auth
host + /api/auth 
*/


router.post(
    '/',
    [//middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser);

router.post(
    '/register',
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser);


router.get('/renew', renewToken);

module.exports = router;