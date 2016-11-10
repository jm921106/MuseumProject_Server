var Notice = require('../models/notice.server.model');

exports.getNotice = function (req, res) {
    // console.log('in noticeRender');
    Notice.find({},{},{sort:{date:-1}},
        function(err, notices) {
            console.log(notices)
        res.send(notices);
    });
};

exports.noticeRender = function (req, res) {
    console.log('in noticeRender');
    Notice.find(function(err, notices) {
        res.render('notice', {
            // title: 'notice',
            notice : notices,
            status: '공지 페이지 실행'
        });
    });
};

exports.noticeInsert = function (req, res) {
    console.log('in noticeInsert');
    Notice.count(function (err, tasks) {
        Notice({
            id: Math.random().toString(36).substr(2, 9),
            date: new Date(),
            writer: req.body.noticeWriter,
            title: req.body.noticeTitle,
            contents: req.body.noticeContents
        }).save();
        res.redirect('/notice');
    });
}

exports.noticeUpdate = function (req, res) {
    console.log('in noticeUpdate');
    Notice.update({id: req.body.noticeIndex}, {
        $set: {
            writer: req.body.noticeWriter,
            title: req.body.noticeTitle,
            contents: req.body.noticeContents
        }
    }, function (err, tasks) {
        if (err) 
            console.log('notice update 중 발생 err : ' + err);
        res.redirect('/notice');
    });
}

exports.noticeDelete = function (req, res) {
    console.log('in noticeDelete');
    Notice.remove({ id : req.body.noticeIndex } , function(err, tasks) {
        res.redirect('/notice');
    })
};