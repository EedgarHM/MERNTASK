// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Creando un usuario
// Endpoint: api/auth
router.post('/',
    [
        check('email','Agrega un Email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
    ],
    authController.autenticarUsuario
)

module.exports = router;