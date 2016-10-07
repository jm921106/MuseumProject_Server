var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    code : Number,
    category : Number,
    title : String,
    content_adult : String,
    content_kid : String,
    imgURL : String,
    like : Number
});

module.exports = mongoose.model('Item', ItemSchema);
