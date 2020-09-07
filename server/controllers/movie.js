const Movie = require('../models/movie');
const _ = require('underscore');

//funcion de prueba: 
let pruebaPelicula = (req, res)=>{
    return res.status(200).json({
        ok:true,
        message:'mensaje de prueba desde movie controller'
    });
};

//funciones de mantenimiento:
let registrarPelicula = (req, res) =>{

    let params = req.body;

    console.log(params);

    let pelicula = new Movie({
        name:params.name,
        description:params.description,
        year:params.year,
        category:params.category,
        platform:params.platform,
        status:true
    });

    pelicula.save((err, peliculabd)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'Ocurrio un error',
                    err: err
                }
            });
        }
    
        if(!peliculabd){
            return res.status(401).json({
                ok:false,
                error:{
                    message:'No se pudo registrar la pelicula',
                    err: err
                }
            });
        }

        return res.status(200).json({
            ok:true,
            pelicula:peliculabd
        });

    });
    
}

let actualizarPelicula = (req, res) =>{
    let id = req.params.id;
    let pelicula = _.pick(req.body, ['name','description','year','category','platform']);

    Movie.findByIdAndUpdate(id, pelicula, (err, peliculabd)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'Ocurrio un error',
                    err: err
                }
            });
        };

        if(!peliculabd){
            return res.status(401).json({
                ok:false,
                error:{
                    message:'No se pudo actualizar la pelicula',
                    err: err
                }
            });
        };

        return res.status(200).json({
            ok:true,
            pelicula:peliculabd
        });
        
    });
}

let obtenerPelicula = (req, res) =>{
    //id parametro
    let id = req.params.id;
    
    Movie.findOne({ _id: id , status: true}, (err, peliculabd)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'Ocurrio un error',
                    err:err
                }
            });
        }

        if(!peliculabd){
            return res.status(401).json({
                ok:false,
                error:{
                    message:'No se pudo obtener la pelicula',
                    err:err
                }
            });
        }

        return res.status(200).json({
            ok:true,
            pelicula: peliculabd
        });

    });
}

let listarPelicua = (req, res) =>{

    //parametros opcionales en el url:
    let inicio = req.query.inicio || 0;
    inicio = Number(inicio);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    //query:
    Movie.find({status:true})
        .skip(inicio)
        .limit(limite)
        .exec((err, peliculas)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    error:{
                        message:'Ocurrio un error',
                        err:err
                    }
                });
            }

            if(!peliculas){
                return res.status(401).json({
                    ok:false,
                    error:{
                        message:'No se puede mostrar la lista de peliculas',
                        err:err
                    }
                });
            }

            let cantidad = peliculas.length;
            

            return res.status(200).json({
                ok:true,
                cantidad: cantidad,
                pelicula:peliculas
            });
        })
}
module.exports = {
    pruebaPelicula,
    registrarPelicula,
    actualizarPelicula,
    obtenerPelicula,
    listarPelicua
}