var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatternSchema = new Schema({
    index : Number,
    date : Date,
    name : String,
    phone : String,
    address : String,
    imgURL : String,
    like : Number
});

module.exports = mongoose.model('Pattern', PatternSchema);
