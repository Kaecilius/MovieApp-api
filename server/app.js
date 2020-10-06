
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//exportar rutas:
const user_routes = require('./routes/user');
const movie_routes = require('./routes/movie');
const list_routes = require('./routes/list');
const item_routes = require('./routes/item');
const vote_route = require('./routes/vote');

const version = '/api/v1';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* probando */
app.get('/prueba',(req, res) =>{
    res.status(200).json({
        ok:true,
        message:'Mensaje desde /prueba'
    });
});

//rutas base:
app.use( version, user_routes   );
app.use( version, movie_routes  );
app.use( version, list_routes   );
app.use( version, item_routes   );
app.use( version, vote_route    );

module.exports = app;