const _ = require('underscore');
const Item = require('../models/item');


//ruta de pruebas
let pruebaItem = (req, res) =>{
    return res.status(200).json({
        ok:true,
        message:'Mensaje desde /testItem'
    });

}

//create
let crearItem = (req, res) =>{

    let item = new Item({
        list: req.body.list,
        movie: req.body.movie
    });

    item.save( (err, itemDB ) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    messge:'Error en el servidor | no se puede crear Item',
                    err: err
                }
            });
        }

        if(!itemDB){
            return res.status(401).json({
                ok:false,
                error:{
                    messge:'No existe |  no se puede crear',
                    err:itemDB
                }
            });
        }

        return res.status(200).json({
            ok:true,
            item:itemDB
        });

    });

}


let obtenerItem  = (req, res) =>{

    //obtener item x id
    let id = req.params.id;

    Item.find( {_id: id })
        .populate('list', 'name')
        .populate('movie', 'name')   
        .exec( (err, itemDB) => {

            if(err){
                return res.status(500).json({
                    ok:false,
                    error:{
                        messge:'Error en el servidor | no se puede acceder a Item',
                        err: err
                    }
                });
            }
    
            if(!itemDB){
                return res.status(401).json({
                    ok:false,
                    error:{
                        messge:'No existe |  no se mostrar item',
                        err:itemDB
                    }
                });
            }
    
            return res.status(200).json({
                ok:true,
                item:itemDB
            });
    
        });
}

let obtenerItems = (req, res) => {

    //obtener el id de la lista
    let idLista = req.params.id;

    Item.find({list:idLista})
        .populate('movie', 'name')
        .exec( (err, itemDB) => {
            if(err){
                return res.status(500).json({
                    ok:false,
                    error:{
                        messge:'Error en el servidor | no se puede acceder a Lista/Item',
                        err: err
                    }
                });
            }
    
            if(!itemDB){
                return res.status(401).json({
                    ok:false,
                    error:{
                        messge:'No existe |  no se mostrar Lista/Item',
                        err:itemDB
                    }
                });
            }
    
            return res.status(200).json({
                ok:true,
                item:itemDB
            });

        });
}

let actualizarItem = (req, res) => {

    //obtenemos el id de el item         
    let id = req.params.id;

    let body = _.pick(req.body, ['movie']);

    let nuevoItem = {
        movie: body.movie,
        //iniciar en 0 los valores
        rank: body.rank | 0,
        votes: body.votes | 0
    }

    Item.findByIdAndUpdate(id, nuevoItem, (err, itemDB) => {
        
        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    messge:'Error en el servidor | no se puede actualizar Item',
                    err: err
                }
            });
        }

        if(!itemDB){
            return res.status(401).json({
                ok:false,
                error:{
                    messge:'No existe |  no se puede actualizar Item',
                    err:itemDB
                }
            });
        }

        return res.status(200).json({
            ok:true,
            item:itemDB
        });
    });

    
}

let removerItem = (req, res) =>{

    //obtenemos el id 
    let id = req.params.id;

    Item.findByIdAndDelete(id, (err, itemDB) => {
        //error de servidor
        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'Error en el servidor | no se pudo eliminar Item',
                    err:err
                }
            });
        }

        //no se encuentra el objeto
        if(!itemDB){
            return res.status(401).json({
                ok:false,
                error:{
                    message:'No existe | no se pudo eliminar Item'
                }
            });
        }

        //ok
        //eliminar los votos
        return res.status(200).json({
            ok:true,
            item:itemDB
        });
    });
}

module.exports = {
    pruebaItem,
    crearItem, 
    obtenerItem,
    obtenerItems,
    actualizarItem,
    removerItem
}