var Notice = require('../models/notice.server.model');

exports.getNotice = function (req, res) {
    // console.log('in noticeRender');
    Notice.find(function(err, notices) {
        res.send(notices);
    });
};

exports.noticeRender = function (req, res) {
    // console.log('in noticeRender');
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
            index: tasks,
            date: new Date(),
            writer: req.body.noticeWriter,
            title: req.body.noticeTitle,
            contents: req.body.noticeContents
        }).save();

        Notice.find(function(err, notices) {
            res.render('notice', {
                // title: 'notice',
                notice : notices,
                status: '공지 추가 완료'
            });
        });
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

        Notice.find(function(err, notices) {
            res.render('notice', {
                // title: 'notice',
                notice : notices,
                status: '공지 수정 완료'
            });
        });
    });
}

exports.noticeDelete = function (req, res) {
    console.log('in noticeDelete');

    Notice.remove({ index : req.body.noticeIndex } , function(err, tasks) {

        Notice.find(function(err, notices) {
            res.render('notice', {
                // title: 'notice',
                notice : notices,
                status: '공지 삭제 완료'
            });
        });
    })
};