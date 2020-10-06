const express = require('express');
const userController = require('../controllers/user');
const md_auth = require('../middlewares/auntenticacion');

const api = express.Router();

//ruta de prubas:
api.get('/testUsuario', [md_auth.verificarToken, md_auth.verificarAdminRole], userController.pruebaUsuario);

//create
api.post('/usuario',userController.registrarUsuario);
//read
api.post('/login',userController.login);
//update
api.put('/usuario/:id',md_auth.verificarToken, userController.registrarUsuario);

module.exports = api;