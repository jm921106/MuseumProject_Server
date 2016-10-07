
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodaySchema = new Schema ({
    date : String,
    count : Number
});

module.exports = mongoose.model('Today', TodaySchema);