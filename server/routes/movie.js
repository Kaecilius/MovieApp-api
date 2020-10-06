const express = require('express');
const md_auth = require('../middlewares/auntenticacion');
const movieController = require('../controllers/movie');

//iniciar router express:
const api = express.Router();

//ruta de prueba:
api.get('/testPelicula',md_auth.verificarToken, movieController.pruebaPelicula);

//create
api.post('/pelicula',md_auth.verificarToken, movieController.registrarPelicula );
//read
api.get('/pelicula/:id', md_auth.verificarToken, movieController.obtenerPelicula );
api.get('/peliculas',md_auth.verificarToken, movieController.listarPelicua );
//update
api.put('/pelicula/:id', md_auth.verificarToken, movieController.actualizarPelicula );
//delete
api.delete('/pelicula/:id',md_auth.verificarToken, movieController.eliminarPelicula );

//exportar modulo:
module.exports = api;