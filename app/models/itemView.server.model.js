
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemViewSchema = new Schema ({
    code : String,
    count : Number
});

module.exports = mongoose.model('ItemView', ItemViewSchema);