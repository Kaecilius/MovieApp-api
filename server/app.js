
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//exportar rutas:
const user_routes = require('./routes/user');
const movie_routes = require('./routes/movie');

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
app.use('/api',movie_routes);


module.exports = app;