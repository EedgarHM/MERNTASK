const express = require('express');
const conectarDB = require('./config/db');

//Creando el servidor
const app = express();

//Conectando a la base de datos
conectarDB();

// Habilitar express.json
app.use(express.json({extended : true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));

//Definir pagina principal
app.get('/',(req,res)=>{
    res.send("Welcome");
})

app.listen(PORT,()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})