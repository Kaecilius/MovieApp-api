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

module.exports = mongoose.model('Movie',movieSchema);