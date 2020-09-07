const jwt = require('jsonwebtoken');


//verificar token
let verificarToken = (req, res, next) =>{

    let token = req.headers.token;

    jwt.verify(token,'seed-de-desarrollo', (err, decoded) =>{
        if(err){

            return res.status(401).json({
                ok:false,
                message:'Token no es valido'

            });
        }
        console.log(decoded);
        //asignar en el req el objeto usuario
        req.usuario = decoded.usuario; //->nombre viene del payload en services
        next();
    });
};


//verificar Rol Adminstrador
let verificarAdminRole = (req, res, next)=>{
    //objeto usuario asignado al descifrar el token
    let usuario = req.usuario;
    if (usuario.role == 'ADMIN-ROLE'){
        console.log('el usuario es administrador');
        next();
    }else{
        res.status(401).json({
            ok:false,
            message:'el usuario no es administrador'
        });
    }
}

module.exports = {
    verificarToken,
    verificarAdminRole
};