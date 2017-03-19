var Paint = require('../models/pattern.server.model');
var PaintLike = require('../models/patternLike.server.model');
var fs = require('fs');

exports.render = function (req, res) {
    console.log("pattern render");

    res.render("pattern", {
        title: 'pattern',
        status: 'render'
    });
};

// costomize post(/patternInsert)
exports.patternInsert = function (req, res) {

    console.log('in pattern insert');
    console.log(req.body.user_id);
    console.log(req.body.name);
    console.log(req.body.phone);
    console.log(req.body.email);

    // 이미지를 해당 날짜 폴더에 자정 시키고 >>> 해당 url 을 디비에 저장 시킨다.
    var img_url = "img_url";

    try {
        var now_date = new Date();
        var year = now_date.getFullYear();
        var month = now_date.getMonth() + 1;
        var filename = year + '_' + addZero(month) + '/' + getDateFormat(now_date) + '_' + req.body.user_id + '.png';
        var file = req.body.result;

        var imageBuffer = decodeBase64Image(file);
        // console.log(imageBuffer);

        fs.writeFile('public/repository/'+filename, imageBuffer.data, function (err) {
            if (err)
                console.log(err);
            else {
                Paint({
                    date: now_date,
                    user_id: req.body.user_id,
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
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

    var post_num = req.body.post_num;

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
    }, {}, {
        sort: { date : -1 }
    }, function (err, tasks) {
        if (err)
            console.log(err);

        // [3개씩 보내기]
        var send_task = [];
        for(var i=post_num*3; i<post_num*3+3; i++) {
            if(tasks[i] != undefined)
                send_task.push(tasks[i])
        }
        //0 0~2
        //1 3~5
        //2 6~8
        //3 9~11
        // 5개만 미리 보내고 더 필요한 것은 추가 적으로 요청
        res.send(send_task);
    }); // find
}

// costomize get(/patternSelect)
exports.patternMaxFind = function (req, res) {
    // console.log('in patternMaxFind')
   
    var date, year, month, day;
    date = new Date();

    // 검색요청 있을때 없을때
    if(req.body.post_date == undefined) {
        year = date.getFullYear();
        month = date.getMonth() + 1;
    } else {
        year = req.body.post_date.split('-')[0];
        month = parseInt(req.body.post_date.split('-')[1]);
    }
    day = 1;

    // 검색 시작 ~ 종료 일자 설정
    var start, end;
    start = new Date(year + '-' + month + '-' + day);
    end = new Date(start);
    end.setMonth(end.getMonth()+1);


    // 해당 달 조회
    var find_query = {
        date : {
            $gte: start,
            $lte: end
        }
    }
    // send every month data
    Paint.find(find_query, function (err, tasks) {
        if (err)
            console.log(err);

        // 데이터 있다면
        if(tasks.length > 0) {

            tasks.forEach(function(v,i) {
               v.like = 0;
            });

            PaintLike.find(function(err, likes) {

                // 좋아요 갯수 파악
                likes.forEach(function(v,i) {
                    tasks.forEach(function(tv,ti) {
                        if(tv.imgURL == v.imgURL) {
                            tv.like += 1;
                        }
                    });
                });

                // 좋아요 순 정렬
                tasks.sort(function(a, b) {
                    return parseFloat(b.like) - parseFloat(a.like);
                });

                res.render("pattern", {
                    title: 'pattern',
                    year: year,
                    month: month,
                    tasks: tasks
                });
            });

        // 데이터 없다면
        } else {
            console.log('test1');
            res.render("pattern", {
                title: 'pattern',
                status: 'render',
                year: year,
                month: month,
                tasks: []
            });
        }

    }); // find
}

// costomize post(/likeCall)
exports.likeCall = function (req, res) {
    PaintLike.find({imgURL : req.body.imgURL},  function(err, tasks) {
        if (err) console.log("/patternLike 에서 발생한 err => " + err);
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
        res.send(likeData);
    });
}

// costomize post(/likePlus)
exports.likePlus = function (req, res) {
    if(req.body.likeStatus == 'true') {
        // insert
        PaintLike({
            imgURL : req.body.imgURL,
            device : req.body.deviceInfo
        }).save();

        console.log('insert완료');
        // res.send('true');
        res.redirect(307, '/patternLikeCall');
    } else {
        //delete
        PaintLike.remove({
            imgURL : req.body.imgURL,
            device : req.body.deviceInfo
        },function(err, data){
            if(err) {
                console.log(err);
            }
            console.log('delete완료');
            // res.send(false)
            res.redirect(307, '/patternLikeCall');
        })
    }
};

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
