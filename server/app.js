
const express = require('express');
const app = express();

/* Rutas */
app.get('/prueba',(req, res) =>{
    res.status(200).json({
        ok:true,
        message:'Mensaje desde /prueba '
    });
});


module.exports = app;