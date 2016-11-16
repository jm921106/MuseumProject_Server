var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatternSchema = new Schema({
    date : Date,
    user_id : String,
    name : String,
    phone : String,
    email : String,
    imgURL : String,
    like : Number
});

module.exports = mongoose.model('Pattern', PatternSchema);
