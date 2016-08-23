var Item = require('../models/item.server.model.js');

exports.render = function (req, res) {
    console.log("item render");
    res.send("item render");
};

exports.search = function (req, res) {
    console.log("item search " + req.params.id);
    res.send("item search " + req.params.id);

    // id = code , code값에 알맞은 값 select
};

exports.insert = function (req, res) {
    console.log("item insert");
    res.send("item insert");

    // insert
    Item = {
        code : 001,
        title : "title",
        content : "content",
        imgURL : "./img/imgURL.png",
        count : 0
    }.save();

    console.log("insert success!")
};

exports.update = function (req, res) {
    console.log("item update");
    res.send("item update");

    // id = code , 해당 code 값의 데이터 수정
};

exports.delete = function (req, res) {
    console.log("item delete");
    res.send("item delete");

    //id = code , 해당 code 값의 데이터 삭제
};