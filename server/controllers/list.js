//list schema
const List = require('../models/list');
const _ = require('underscore');

let pruebaLista = (req, res) =>{
    res.status(200).json({
        ok:true,
        message:'Este es un mensaje de prueba desde list controller'
    });

}

let crearLista = (req, res) =>{

    let body = req.body;

    let lista = new List({
         user: body.user,
         name: body.name,
         public: body.public || true
    });

    lista.save((err,listabd) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'Ocurrio un error en el servidor',
                    err:err
                }
            });
        }

        if(!listabd){
            return res.status(401).json({
                ok:false,
                error:{
                    message:'No se pudo crear la lista',
                    err:err
                }
            });
        }
        return res.status(200).json({
            ok:true,
            lista:listabd
        });

    });
}

obtenerListas = (req, res) =>{

    List.find({public:'true'})
        .populate('user','name')
        .sort('name')
        .exec((err, listasbd)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    error:{
                        message:'Ocurrio un error en el servidor',
                        err:err
                    }
                });
            }
    
            if(!listasbd){
                return res.status(401).json({
                    ok:false,
                    error:{
                        message:'No se pudo crear la lista',
                        err:err
                    }
                });
            }
            let cantidad = listasbd.length;

            return res.status(200).json({
                ok:true,
                total:cantidad,
                lista:listasbd
            });
        })
    
}


let actualizarLista = (req, res) =>{

    let id = req.params.id;

    let listaNueva = _.pick(req.body, ['name','public']);

    List.findByIdAndUpdate( id, listaNueva, (err, listsUpdate)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'Error en el servidor no se pudo actualizar la lista',
                    err:err
                }
            });
        }

        if(!listsUpdate){
            return res.status(401).json({
                ok:false,
                error:{
                    message:'No se pudo actualizar la lista',
                    err:err
                }
            });
        }

        return res.status(200).json({
            ok:true,
            lista:listsUpdate
        });



    });

}

let eliminarLista = (req, res) =>{

    let id = req.params.id;

    //actualizar el paramerto active a false - posterior a eliminar.
    List.findByIdAndUpdate(id, {active: false}, {new:true }, (err, listaRemove) => {
        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'Error en el servidor no se pudo eliminar la lista',
                    err:err
                }
            });
        }

        if(!listaRemove){
            return res.status(401).json({
                ok:false,
                error:{
                    message:'No se pudo elminar la lista',
                    err:err
                }
            });
        }

        return res.status(200).json({
            ok:true,
            lista:listaRemove
        });
    });
}

let obtenerListaUsuario = (req, res) => {

    let id = req.params.id;
    
    List.find( { user:id, active: true } ,(err,usuarioListdb) =>{

         if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'Error en el servidor no se pudo enconotrar la lista',
                    err:err
                }
            });
        }

        if(!usuarioListdb){
            return res.status(401).json({
                ok:false,
                error:{
                    message:'No se encontro la lista de usuario',
                    err:err
                }
            });
        }

        return res.status(200).json({
            ok:true,
            lista:usuarioListdb
        });
    });
}

module.exports = {
    pruebaLista,
    crearLista,
    obtenerListas,
    obtenerListaUsuario,
    actualizarLista,
    eliminarLista
}