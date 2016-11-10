
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodaySchema = new Schema ({
    dateString : String,
    date : Date,
    count : Number
});

module.exports = mongoose.model('Today', TodaySchema);