const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser, createUser, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const router = Router();

/* 
Auth Routes 
host + /api/auth 
*/


router.post(
    '/',
    [//middlewares
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser);

router.post(
    '/register',
    [//middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser);


router.get('/renew', jwtValidator, renewToken);

module.exports = router;