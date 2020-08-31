
const express = require('express');
const app = express();
const boyParser = require('body-parser');

//exportar rutas:
const user_routes = require('./routes/user');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* probando */
app.get('/prueba',(req, res) =>{
    res.status(200).json({
        ok:true,
        message:'Mensaje desde /prueba '
    });
});


//rutas base:
app.use('/api',user_routes);


module.exports = app;