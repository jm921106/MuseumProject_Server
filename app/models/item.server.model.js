var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    code : Number,
    title : String,
    content : String,
    imgURL : String,
    count : Number
});

module.exports = mongoose.model('Item', ItemSchema);
