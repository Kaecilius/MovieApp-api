const express = require('express');
const md_auth = require('../middlewares/auntenticacion');
const movieController = require('../controllers/movie');

const api = express.Router();

//ruta de prueba:
api.get('/prueba-movie',md_auth.verificarToken, movieController.pruebaPelicula);

//rutas:
api.post('/registrar-pelicula',md_auth.verificarToken, movieController.registrarPelicula );
api.put('/actualizar-pelicula/:id', md_auth.verificarToken, movieController.actualizarPelicula );
api.get('/pelicula/:id', md_auth.verificarToken, movieController.obtenerPelicula );
api.get('/peliculas',md_auth.verificarToken, movieController.listarPelicua );

module.exports = api;