/**
 * Created by superMoon on 2016-08-17.
 */

var config = require('./config');
var mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
    return db;
};

