/**
 * Created by superMoon on 2016-08-17.
 */

var config = require('./config');
var mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
    
    require('../app/models/user.server.model');
    
    return db;
};

