const express = require('express');
const api = express.Router();

const itemController = require('../controllers/item');
const md_auth = require('../middlewares/auntenticacion');

api.get('/testItem', md_auth.verificarToken, itemController.pruebaItem );

//create
api.post('/item', md_auth.verificarToken, itemController.crearItem );
//read
api.get('/item/:id', md_auth.verificarToken, itemController.obtenerItem );
api.get('/items/:id', md_auth.verificarToken, itemController.obtenerItems );
//update
api.put('/item/:id', md_auth.verificarToken, itemController.actualizarItem  );
//delete
api.delete('/item/:id', md_auth.verificarToken, itemController.removerItem );

module.exports = api;                 