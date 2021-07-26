const Usuario = require('../models/Usuario');
const bc = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUsuario = async (req,res) =>{
    
    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {email, password} = req.body;

    try {
        // Validando Usuarios unicos
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({msg : 'El Usuario ya esta registrado'})
        }
        // Crear el nuevo usuario
        usuario = new Usuario(req.body);
        
        // Hasheando el password
        const salt = await bc.genSalt(10);
        usuario.password = await bc.hash(password,salt);

        // Guardar usuario
        await usuario.save()

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
        })

       
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}