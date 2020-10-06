const Item = require('../models/item');
const Vote = require('../models/vote');

let validaItem = (req, res, next ) => {

    let idItem = req.params.id;

    //buscar si existe el item:
    Item.findById( idItem, (err, itemDB) => {

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

        next();
    });

}

let validaVoto = (req, res, next) =>{

    //obtener el id del usuario:
    let idUser = req.usuario['_id'];

    //obtener id item:
    let idItem = req.params.id;

    Item.findOne( { _id: idItem }, 'list')
        .populate({ path:'list', select:'name'})
        .exec( (err, list )  => {

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
                                message:'lista no existe!'
                            }
                        });
                }

                //comprobar si el voto es el mismo para el usuario:
                Vote.findOne( {user:idUser, item: idItem }, 'item' )
                    .exec( (err, voteBd) => {
                        if(err){
                            return res.status(500).json({
                                ok:false,
                                error:{
                                    message:'Error en el servidor',
                                    err:err
                                }
                            });
                        }
                        
                        //eliminar si ya existe el voto
                        if( voteBd ){

                                console.log( voteBd );

                                return res.status(200).json({
                                    ok:true,
                                    vote:{
                                        message:'Ya tienes un voto para este elemento !',
                                        vote:voteBd
                                    }
                                });
                        }else{

                            //remover el voto existente en la lista:
                            Vote.findOneAndDelete( { user: idUser, list: list.list._id } )
                                .exec( (err, voteDeleted) => {

                                    if(err){
                                        return console.log( err );
                                    }

                                    if(!voteDeleted){
                                        return console.log('todavia no hay votos');
                                    }

                                    console.log('item removido');
                                    console.log(voteDeleted );

                                });

                        }

                        next();

                    });
        
        });







}


module.exports = {
    validaItem,
    validaVoto
}