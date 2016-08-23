/**
 * Created by superMoon on 2016-08-17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    firstName : String,
    lastName : String,
    email : String,
    username : String,
    password : String
});

mongoose.model('User', UserSchema);