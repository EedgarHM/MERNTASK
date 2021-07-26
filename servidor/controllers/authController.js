const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.autenticarUsuario = async (req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    // Extraer email y password
    const { email, password } = req.body;

    try {
        // Revisar que el usuario exista
        let usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'});
        }

        // Revisar el password
        const passCorrecto = await bc.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: "El password es incorrecto"});
        }

        // Crear y firmar el JWT
        const payload = { 
            usuario : {
                id: usuario.id
            }
        };

        // Firmando el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600000
        }, (error, token)=>{
            if(error) throw error;

            //Mensaje de confirmacion
            res.json({ token })
        }); 

    } catch (error) {
        console.log(error)
    }
}