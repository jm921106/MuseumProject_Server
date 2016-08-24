var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    code : Number,
    title : String,
    content : String,
    imgURL : String,
    like : Number
});

module.exports = mongoose.model('Item', ItemSchema);
