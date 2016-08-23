/**
 * Created by superMoon on 2016-08-17.
 */



process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();
var app = express();
app.listen(7777);

module.exports = app;

console.log('Server running at http://localhost:7777/');