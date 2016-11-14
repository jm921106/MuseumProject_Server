var Today = require('../models/today.server.model');
var ItemViewCount = require('../models/itemView.server.model');

exports.todayLoad = function (req, res) {
    console.log('in todayLoad');

    // 오늘 날짜를 확인
    var date = new Date();
    var dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(); // 2016-11-10

    Today.find({dateString: dateString}, function (err, tasks) {
        if (err)
            console.log(err);
        if (tasks.length > 0) {
            console.log('today count update');
            Today.update({dateString: tasks[0].dateString}, {$set: {count: tasks[0].count + 1}}, function () {
                res.send('today count update success');
            });
        } else {
            console.log('today count init');
            Today({
                dateString: dateString,
                date: date,
                count: 1
            }).save();
            res.send('today count insert success');
        }
    });
};

exports.todaySearch = function (req, res) {
    // today 데이터를 전송한다.
    Today.find({}, function (err, tasks) {
        if (err)
            console.log(err);
        res.send(tasks);
    });
};

exports.itemViewCount = function (req, res) {
    console.log('in itemViewCount');

    console.log(req.body.code);

    ItemViewCount.find({code: req.body.code}, function (err, tasks) {
        if (err)
            console.log(err);

        console.log(tasks.length)

        if (tasks.length > 0) {
            console.log('item view count update');
            ItemViewCount.update({code : tasks[0].code}, {$set: {count: tasks[0].count + 1}}, function () {
                ItemViewCount.find({code : req.body.code}, function (err, tasks) {
                    if (err) console.log(err);
                    if(tasks.length > 0) {
                        res.send(tasks[0].count.toString());
                    } else {
                        res.send('0');
                    }
                });
            });
        } else {
            console.log('item view count init');
            try{
                ItemViewCount({
                    code : req.body.code,
                    count: 1
                }).save();
                ItemViewCount.find({code : req.body.code}, function (err, tasks) {
                    if (err) console.log(err);
                    if(tasks.length > 0) {
                        res.send(tasks[0].count.toString());
                    } else {
                        res.send('0');
                    }
                });
            }catch(e) {
                console.log(e)
            }
        }
    });
};