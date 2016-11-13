var itemTask = require('../models/item.server.model.js');
var likeTask = require('../models/like.server.model.js');
var fs = require('fs');

// item render get(/item)
exports.render = function (req, res) {
    console.log("item render");
    
    res.render("item", {
        title: "item render",
        status: 'render'
    });
};

// costomize get(/itemInsert)
exports.itemInsert = function (req, res) {

    // 중복방지
    itemTask.find({ code : req.body.itemCode }, function(err, task) {
        if(err) {
            console.log('item insert 중 발생 error' + err);
        }

        if(task.length > 0) {

            res.render("item", {
                title: "item render",
                status: 'item code 중복'
            });

        } else {

            itemTask({
                code: req.body.itemCode,
                category: req.body.itemCategory,
                title: req.body.itemTitle,
                content_adult : req.body.itemContent_Adult,
                content_kid : req.body.itemContent_Kid,
                imgURL: req.body.itemImgUrl,
                like: 0
            }).save();

            var status = "insert success! itemTitle : " + req.body.itemTitle;

            res.render("item", {
                title: "item render",
                status: status
            });

        }
    });
};

// costomize post(/itemSelect)
exports.itemSelect = function (req, res) {
    itemTask.find({code: req.body.code}, function (err, tasks) {
        if (err) {
            console.log("/itemSelect 에서 db find 중 발생한 err => " + err);
        }

        res.send(tasks);
    });
};

// costomize post(/likeCall)
exports.likeCall = function (req, res) {
    console.log('in like call');
    
    console.log(req.body.code);
    console.log(req.body.deviceInfo);

    likeTask.find({code : req.body.code},  function(err, tasks) {
        if (err) 
            console.log("/itemLike 에서 상태 on일때 update중 발생한 err => " + err);
        console.log(tasks)

        var likeData = {
            "count" : 0,
            "status" : false
        };

        if(tasks.length > 0) {
            // tasks for문
            // length 0 >>> insert 0으로
            // 있으면 reurn count // 좋아요상태
            tasks.forEach(function (task) {
                likeData.count++;
                if(task.device == req.body.deviceInfo) {
                    likeData.status = true;
                }
            });
        }
        likeData.count = likeData.count.toString();
        console.log(likeData.count);
        console.log(likeData.status);
        res.send(likeData);
    });
}

// costomize post(/likePlus)
exports.likePlus = function (req, res) {
    console.log('in like puls');
    console.log(req.body.code);
    console.log(req.body.deviceInfo);
    console.log(req.body.likeStatus);
    console.log(req.body.likeStatus == 'true');

    
    if(req.body.likeStatus == 'true') {
        // insert
        likeTask({
            code : req.body.code,
            device : req.body.deviceInfo
        }).save();
        likeTask.find({code : req.body.code},  function(err, tasks) {
            if (err)
                console.log("/itemLike 에서 상태 on일때 update중 발생한 err => " + err);
            console.log(tasks)

            var likeData = {
                "count" : 0,
                "status" : false
            };

            if(tasks.length > 0) {
                // tasks for문
                // length 0 >>> insert 0으로
                // 있으면 reurn count // 좋아요상태
                tasks.forEach(function (task) {
                    likeData.count++;
                    if(task.device == req.body.deviceInfo) {
                        likeData.status = true;
                    }
                });
            }
            likeData.count = likeData.count.toString();
            console.log(likeData.count);
            console.log(likeData.status);
            res.send(likeData);
        });
    } else {
        //delete
        likeTask.remove({
            code : req.body.code,
            device : req.body.deviceInfo
        },function(err, data){
            if(err) {
                console.log(err);
            }
            likeTask.find({code : req.body.code},  function(err, tasks) {
                if (err)
                    console.log("/itemLike 에서 상태 on일때 update중 발생한 err => " + err);
                console.log(tasks)

                var likeData = {
                    "count" : 0,
                    "status" : false
                };

                if(tasks.length > 0) {
                    // tasks for문
                    // length 0 >>> insert 0으로
                    // 있으면 reurn count // 좋아요상태
                    tasks.forEach(function (task) {
                        likeData.count++;
                        if(task.device == req.body.deviceInfo) {
                            likeData.status = true;
                        }
                    });
                }
                likeData.count = likeData.count.toString();
                console.log(likeData.count);
                console.log(likeData.status);
                res.send(likeData);
            });
        })
    }
};


// costomize post(/likePlus)
exports.myLike = function (req, res) {
    console.log(req.body.deviceInfo);
    likeTask.find({device : req.body.deviceInfo},  function(err, tasks) {
        if (err) console.log("/myLike 에서 발생한 err => " + err);
        console.log(tasks);
        res.send(tasks);
    });
};

// restful[1] search
exports.search = function (req, res) {
    console.log("item search " + req.params.id);
    res.send("item search " + req.params.id);
};

// restful[2] insert
exports.insert = function (req, res) {
    console.log("item insert");
    res.send("item insert");
};

// restful[3] update
exports.update = function (req, res) {
    console.log("item update");
    res.send("item update");

    // id = code , 해당 code 값의 데이터 수정
};

// restful[4] delete
exports.delete = function (req, res) {
    console.log("item delete");
    res.send("item delete");

    //id = code , 해당 code 값의 데이터 삭제
};


