//list schema
const List = require('../models/list');
const list = require('../models/list');
const { isArguments } = require('underscore');

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

module.exports = {
    pruebaLista,
    crearLista,
    obtenerListas
}