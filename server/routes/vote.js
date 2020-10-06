const express  = require('express');

const md_auth = require('../middlewares/auntenticacion');
const md_validation = require('../middlewares/validacion');

const voteController = require('../controllers/vote');

const api = express.Router();

//test
api.get('/testVote/:id', [md_auth.verificarToken, md_validation.validaItem, md_validation.validaVoto ], voteController.pruebaVoto );

//create - push vote
api.post('/vote/:id', [md_auth.verificarToken, md_validation.validaItem, md_validation.validaVoto], voteController.crearVoto );

module.exports= api;