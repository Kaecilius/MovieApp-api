const Vote = require('../models/vote');
const List = require('../models/item');
const Item = require('../models/item');
const { json } = require('body-parser');

//funcion de prueba
let pruebaVoto = (req, res) => {

    return res.status(200).json({
        ok:true,
        message:'Mensaje de prueba desde Voto !!!'
    });
}

//create
let crearVoto = (req, res) => {
    
    //obtener el id del elemento a votar
    let idItem = req.params.id;

    //obtener el userId del token
    let idUser  = req.usuario['_id'];

    //obtener la lista a la que pertenece:
    Item.findOne( {_id: idItem} ).exec( (err, list) => {

        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'Error en el servidor',
                    err:err
                }
            });
        }

        if(!list){
            return res.status(401).json({
                ok:false,
                error:{
                    message:'La lista no existe'
                }
            });
        }

        //objeto del voto con lista de item:
        let vote = new Vote({
            item: idItem,
            user: idUser,
            list: list.list
        });

        //guardar voto en la BD:
        vote.save( (err, itemDB) => {
    
            if(err){
                return res.status(500).json({
                    ok:false,
                    error:{
                        message:'Error en el servidor |  Item no existe'
                    }
                });
            }
    
            //si no existe - no continuar
            if(!itemDB){
                return res.status(401).json({
                    ok:false,
                    error:{
                        message:`El objeto: ${ idItem } no existe`
                    }
                });
            }
            
            return res.status(200).json({
                ok:true,
                vote:itemDB
            });
    
        });
        
    });


}

module.exports = {
    pruebaVoto,
    crearVoto
}
