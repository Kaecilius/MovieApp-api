const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    name:{type:String,required:[true, 'El nombre es necesario'] },
    description:{type:String, required:[true,'la descripccion es necesaria']},
    year:{type:Number, required:[true, 'El año es necesario']},
    category:{type:[String], required:false},
    platform:{type:[String], required:false},
    image:{type:String, default:'none'},
    status:{type:Boolean, default:true}
});


movieSchema.methods.toJSON = function(){
    let movie = this;
    let movieObject = movie.toObject();

    delete movieObject.status;

    return movieObject;
}
module.exports = mongoose.model('Movie',movieSchema);