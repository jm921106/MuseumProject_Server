
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticeSchema = new Schema ({
    id : String,
    date : Date,
    writer : String,
    title : String,
    contents : String
});

module.exports = mongoose.model('Notice', NoticeSchema);