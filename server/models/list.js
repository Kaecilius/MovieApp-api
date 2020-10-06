const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = new Schema({
    user:   { type:Schema.ObjectId, ref:'User', required: true   },
    name:   { type:String, required:    true    },
    public: { type:Boolean, default:    false   },
    image:  { type:String, required:    false   },
    active: { type:String, default:     true    }
});


listSchema.methods.toJSON = function(){

    let list = this;
    let listObject = list.toObject();

    delete listObject.public;

    return listObject;
}


module.exports = mongoose.model('List',listSchema);