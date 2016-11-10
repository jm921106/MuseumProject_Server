var Today = require('../models/today.server.model');

exports.todayLoad = function (req, res) {
    console.log('in todayLoad');

    // 오늘 날짜를 확인
    var date = new Date();
    var dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(); // 2016-11-10

    console.log(date);
    console.log(dateString);

    Today.find({date: dateString}, function (err, tasks) {
        if (err)
            console.log(err);

        if (tasks.length > 0) {
            console.log('today count update');
            Today.update({date: tasks[0].dateString}, {$set: {count: tasks[0].count + 1}}, function () {
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

    // 오늘 날짜를 확인
    // var date = new Date();
    // var dateString = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate();

    Today.find({}, function (err, tasks) {
        if (err)
            console.log(err);

        res.send(tasks);
    });
};
