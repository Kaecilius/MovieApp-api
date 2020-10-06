const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let voteSchema = new Schema({
    user:{ type:Schema.ObjectId, ref:'User', required:true },
    item:{ type:Schema.ObjectId, ref:'Item', required:true },
    list:{ type:Schema.ObjectId, ref:'List', required: false }
});


voteSchema.pre('save', () => { 
        console.log('pre save function !!');
    });

module.exports = mongoose.model('Vote', voteSchema);