var Notice = require('../models/notice.server.model');

exports.noticeRender = function (req, res) {
    console.log('in noticeRender');
    res.render('notice', {
        title: 'notice',
        status: 'notice render'
    });
};

exports.noticeInsert = function (req, res) {
    console.log('in noticeInsert');

    Notice.count(function (err, tasks) {
        Notice({
            index: tasks,
            writer: req.body.noticeWriter,
            title: req.body.noticeTitle,
            contents: req.body.noticeContents
        }).save();
    });

    res.render('notice', {
        title: 'notice',
        status: 'notice insert!'
    });
}

exports.noticeUpdate = function (req, res) {
    console.log('in noticeUpdate');

    Notice.update({index: req.body.noticeIndex}, {
        $set: {
            writer: req.body.noticeWriter,
            title: req.body.noticeTitle,
            contents: req.body.noticeContents
        }
    }, function (err, tasks) {
        if (err) {
            console.log('notice update 중 발생 err : ' + err);
        }

        res.render('notice', {
            title: 'notice',
            status: 'notice update!'
        });
    });
}

exports.noticeDelete = function (req, res) {
    console.log('in noticeDelete');

    Notice.remove({ index : req.body.noticeIndex } , function(err, tasks) {

        res.render('notice', {
            title: 'notice',
            status: 'notice delete!'
        });
    })
};