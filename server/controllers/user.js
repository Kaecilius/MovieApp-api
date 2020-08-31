
const bcrypt = require('bcrypt');
const User = require('../models/user');


let pruebaUsuario = (req, res) =>{

    res.status(200).json({
        ok:true,
        message:'Probando desde controlador Usuario'
    });

}


module.exports = {
    pruebaUsuario
}
