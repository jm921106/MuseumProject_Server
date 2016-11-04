var Paint = require('../models/pattern.server.model');
var fs = require('fs');
// var path = require('path');

exports.render = function (req, res) {
    console.log("pattern render");

    res.render("pattern", {
        title: 'pattern',
        status: 'render'
    });
};

// get Image
exports.search = function (req, res) {
    // console.log("pattern search");
    // console.log(req.params.dir);
    // console.log(req.params.file);
    res.send(true)
};
exports.insert = function (req, res) {
    console.log(req.body.user_id);
    console.log(req.body.name);
    console.log(req.body.phone);
    console.log(req.body.address);
    console.log(req.body.result);
    // img_src
    // like
    // date
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

// costomize post(/patternInsert)
exports.patternInsert = function (req, res) {

    // console.log('in pattern insert');
    // console.log(req.body.user_id);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // console.log(req.body.address);

    // 이미지를 해당 날짜 폴더에 자정 시키고 >>> 해당 url 을 디비에 저장 시킨다.
    var img_url = "img_url";

    try {
        var now_date = new Date();
        var year = now_date.getFullYear();
        var month = now_date.getMonth() + 1;
        var filename = year + '_' + addZero(month) + '/' + getDateFormat(now_date) + '_' + req.body.user_id + '.png';
        var file = req.body.result;

        var imageBuffer = decodeBase64Image(file);
        console.log(imageBuffer);

        fs.writeFile('public/repository/'+filename, imageBuffer.data, function (err) {
            if (err)
                console.log(err);
            else {
                Paint({
                    date: now_date,
                    user_id: req.body.user_id,
                    name: req.body.name,
                    phone: req.body.phone,
                    address: req.body.address,
                    imgURL: filename,
                    like: 0
                }).save();
                res.send(true);
            }
        });

    } catch (e) {
        console.log(e)
    }
};

// costomize post(/patternSelect)
exports.patternSelect = function (req, res) {
    Paint.find({phone: req.body.patternUserPhone}, function (err, tasks) {
        if (err)
            console.log("/itemSelect 에서 db find 중 발생한 err => " + err);
        else
            res.send(tasks);
    });
};

// costomize get(/patternSelect)
exports.patternFind = function (req, res) {

    // now month check
    var now_date = new Date();
    var year = now_date.getFullYear();
    var month = now_date.getMonth() + 1;
    var dirname = 'public/repository/' + year + '_' + addZero(month) + '/';

    // send every month data
    Paint.find({
        $where: function () {
            return this.date.getMonth() == new Date().getMonth()
        }
    }, function (err, tasks) {
        if (err)
            console.log(err);
        
        // 5개만 미리 보내고 더 필요한 것은 추가 적으로 요청
        res.send(tasks);
    }); // find
}

/**
 * util
 */


function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

function addZero(num) {
    if (num < 10)
        return '0' + num;
    else
        return num;
}

function getDateFormat(date) {
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());
    return year + '_' + month + '_' + day + '_' + hour + '_' + minute + '_' + second
}
