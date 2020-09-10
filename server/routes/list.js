const express  = require('express');
const listController = require('../controllers/list');
const md_auth = require('../middlewares/auntenticacion');


const api = express.Router();


api.get('/lista-prueba', md_auth.verificarToken , listController.pruebaLista );
api.post('/crear-lista',md_auth.verificarToken, listController.crearLista );
api.get('/listas',md_auth.verificarToken, listController.obtenerListas);


module.exports = api;