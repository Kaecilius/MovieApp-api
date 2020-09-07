const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let roles = {
    values: ['USER-ROLE', 'ADMIN-ROLE'],
    mesage: '{Value} no es un rol valido'
}

let userSchema = new Schema({
    email: {type:String, unique:true, required:[true, 'El email es necesario']},
    name:{type:String, required:[true, 'El nombre es necesario']},
    password:{type:String, required:[true, 'La constraseña es necesaria']},
    image:{type:String, required:false},
    role:{type:String, default:'USER-ROLE', enum: roles},
    group:{type:String, required:false}

});


userSchema.methods.toJSON  = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(validator, {message:'{PATH} debe ser unico'});



module.exports = mongoose.model('User', userSchema);