const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();

api.get('/prueba-user', UserController.pruebaUsuario);

module.exports = api;