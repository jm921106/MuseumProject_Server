var itemTask = require('../models/item.server.model.js');
var fs = require('fs');

exports.render = function (req, res) {
    console.log("item render");

    itemTask.find(function (err, tasks) {
        if (err) {
            console.log("/item 에서 db find 중 발생한 err => " + err);
        }

        console.log("render complete");

        res.render("item", {
            title: "item render",
            items: tasks
        });
    });
};

exports.search = function (req, res) {
    console.log("item search " + req.params.id);
    res.send("item search " + req.params.id);

    // id = code , code값에 알맞은 값 select
};

exports.insert = function (req, res) {
    console.log("item insert");

    // // insert sample
    // Item = {
    //     code : 001,
    //     title : "title",
    //     content : "content",
    //     imgURL : "./img/imgURL.png",
    //     like : 0
    // }.save();

    res.send("item insert");
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


exports.itemInsert = function (req, res) {
    fs.readFile('./app/models/item.txt', 'utf8', function (err, items) {
        if (err) {
            console.log("item.json readFile중 발생한 Error => " + err);
        }

        var jsonItems = JSON.parse(items);

        jsonItems.items.forEach(function (item) {
            itemTask({
                code: item.code,
                title: item.title,
                content: item.content,
                imgURL: item.imgURL,
                like: item.like
            }).save();
        })
    });

    console.log("insert success!")

    // // insert sample
    // Item = {
    //     code : 001,
    //     title : "title",
    //     content : "content",
    //     imgURL : "./img/imgURL.png",
    //     like : 0
    // }.save();

    res.send("insert success!");
};

exports.itemSelect = function (req, res) {
    console.log("item select");

    itemTask.find({code : req.body.code} , function(err, tasks) {
        if (err) {
            console.log("/itemSelect 에서 db find 중 발생한 err => " + err);
        }

        res.json(tasks);
    });
};

exports.itemLike = function (req, res) {
    console.log("item like [Ajax 처리 필요]");

    console.log(req.body.likeStatus);
    console.log(typeof (req.body.likeStatus));

    // if(req.body.likeStatus == "on") {
    //
    //     itemTask.update({code : req.body.code}, {count : 10} ,  function(err, tasks) {
    //         if (err) {
    //             console.log("/itemLike 에서 상태 on일때 update중 발생한 err => " + err);
    //         }
    //
    //         res.json(tasks);
    //     });
    //
    // } else {
    //
    //     itemTask.update({code : req.body.code} , {count : 20} , function(err, tasks) {
    //         if (err) {
    //             console.log("/itemLike 에서 상태 on일때 update중 발생한 err => " + err);
    //         }
    //
    //         res.json(tasks);
    //     });
    // }

    res.send("item Like 미완성입니다.")
}