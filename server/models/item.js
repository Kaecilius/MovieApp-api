const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
    list:{ type: Schema.ObjectId, ref:'List', required: true },
    movie: { type: Schema.ObjectId, ref:'Movie', required:true },
    votes:{ type:Number, default: 0 },
    rank:{ type:Number, default: 0 }
});

module.exports = mongoose.model('Item', itemSchema )