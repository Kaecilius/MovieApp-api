const express  = require('express');
const listController = require('../controllers/list');
const md_auth = require('../middlewares/auntenticacion');

const api = express.Router();

api.get('/testLista', md_auth.verificarToken , listController.pruebaLista );

//create
api.post('/lista',md_auth.verificarToken, listController.crearLista );
//read
api.get('/listas',md_auth.verificarToken, listController.obtenerListas);
api.get('/lista/:id',md_auth.verificarToken, listController.obtenerListaUsuario );
//update
api.put('/lista/:id',md_auth.verificarToken, listController.actualizarLista );
//delete
api.delete('/lista/:id', md_auth.verificarToken, listController.eliminarLista );

module.exports = api;