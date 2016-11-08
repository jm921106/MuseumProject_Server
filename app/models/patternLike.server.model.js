var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
    imgURL : String,
    device : String,
    // status : Boolean
});

module.exports = mongoose.model('patternLike', LikeSchema);
