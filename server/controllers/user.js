const bcrypt = require('bcrypt');
const User = require('../models/user');
const _ = require('underscore');
const jwt = require('../services/jwt');

let pruebaUsuario = (req, res) =>{
    res.status(200).json({
        ok:true,
        message:'Probando desde controlador Usuario'
    });
}

let registrarUsuario = (req, res) => {
    //recibir la data del body
    let params = req.body;
    
    console.log(params);

    let usuario = new User({
        email:params.email,
        name:params.name,
        //encriptar la contraseña
        password: bcrypt.hashSync( params.password, 10 ),
        group:'none'
    });
    usuario.save( (err, usuariobd)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                message:'no se ha podido registar el usuario, intentelo de nuevo',
                error:err.message
            });
        }
        return res.status(200).json({
            ok:true,
            usuario:usuariobd 
           
        });
    });
}

let login = (req, res) =>{

    let params =  req.body;

    User.findOne({email:params.email},(err, usuariobd)=>{

        //cuando ocurre un error
        if(err){
            return res.status(500).json({
                ok:false,
                message:'No se ha podido inciar sesion intentelo nuevamente',
                error:err
            });
        }

        //si no se encuentra el usuario en la bd
        if(!usuariobd){
            return res.status(400).json({
                ok:false,
                message:'(usuario) o contraseña incorreta'
            });
        }

        //comparar si la contraseña coincide con la de bd
        if(!bcrypt.compareSync(params.password, usuariobd.password)){
            return res.status(400).json({
                ok:false,
                message:'usuario o (contraseña) incorrecta'
            });
        }

        //generar token cuando el login es ok
        let token = jwt.generarToken(usuariobd);

        return res.status(200).json({
            ok:true,
            usuario:usuariobd,
            token:token
        });

    });

}


let actualizarUsuario = (req, res) =>{

    let updateDate = _.pick(req.body, ['name', 'email', 'group']);
    let id = req.params.id;

    User.findByIdAndUpdate(id, updateDate, (err, updateUser)=>{
        if(err){

            return res.status(500).json({
                ok:false,
                message:'Error no se pudo actualizar el usario intentelo nuevamente',
                error:err
            });
        }

        if(!updateUser){
            return res.status(401).json({
                ok:false,
                message:'El usario no existe'
            });
        }

        return res.status(200).json({
            ok:true,
            message:'usuario actualizado con exito',
            usuario:updateUser
        });


        
    });


}

module.exports = {
    pruebaUsuario,
    registrarUsuario,
    login,
    actualizarUsuario
}
