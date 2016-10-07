
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticeSchema = new Schema ({
    index : Number,
    date : String,
    writer : String,
    title : String,
    contents : String
});

module.exports = mongoose.model('Notice', NoticeSchema);