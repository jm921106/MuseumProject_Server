var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
    code : String,
    device : String,
    // status : Boolean
});

module.exports = mongoose.model('Like', LikeSchema);
