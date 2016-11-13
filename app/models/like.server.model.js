var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
    code : String,
    device : String
});

module.exports = mongoose.model('Like', LikeSchema);
