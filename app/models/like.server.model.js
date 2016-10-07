var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
    code : Number,
    device : String,
    // status : Boolean
});

module.exports = mongoose.model('Like', LikeSchema);
