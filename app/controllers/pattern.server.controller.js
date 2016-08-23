var Paint = require('../models/pattern.server.model');

exports.render = function (req, res) {
    console.log("pattern render");
    res.send("pattern render");
};

exports.search = function (req, res) {
    console.log("pattern search");
    res.send("pattern search");
};

exports.insert = function (req, res) {
    console.log("pattern insert");
    res.send("pattern insert");
};

exports.update = function (req, res) {
    console.log("pattern update");
    res.send("pattern update");
};

exports.delete = function (req, res) {
    console.log("pattern delete");
    res.send("pattern delete");
};