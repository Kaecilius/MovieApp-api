const express = require('express');
const userController = require('../controllers/user');
const md_auth = require('../middlewares/auntenticacion');

const api = express.Router();

//ruta de prubas:
api.get('/prueba-user', [md_auth.verificarToken, md_auth.verificarAdminRole], userController.pruebaUsuario);

//ruas:
api.post('/registrar-usuario',userController.registrarUsuario);
api.post('/login',userController.login);
api.put('/actualizar-usuario/:id',md_auth.verificarToken, userController.registrarUsuario);

module.exports = api;