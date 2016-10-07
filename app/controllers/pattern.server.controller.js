var Paint = require('../models/pattern.server.model');

exports.render = function (req, res) {
    console.log("pattern render");
    
    res.render("pattern", {
        title : 'pattern',
        status : 'render'
    });
};

exports.search = function (req, res) {
    console.log("pattern search");
    res.send("pattern search");
};
exports.insert = function (req, res) {
    console.log("pattern insert");
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
    console.log('in pattern insert');

    // [issue] now year/month check

    // img file을 year_month dir에 저장 (req.body.patternImgObject)

    // 해당 경로를 imgUrl로 db에 저장

    // index
    var index;
    Paint.count({}, function(err, count) {
        index = count;
    });

    // 중복방지
    Paint.find({ phone : req.body.patternUserPhone }, function(err, task) {
        if(err) {
            console.log('pattern insert 중 발생 error' + err);
        }

        if(task.length > 0) {

            res.render("pattern", {
                title: "pattern",
                status: 'failed : already exist phone number.'
            });

        } else {

            Paint({
                index : index,
                date : new Date(),
                name : req.body.patternUserName,
                phone : req.body.patternUserPhone,
                address : req.body.patternUserAddress,
                imgURL: req.body.patternImgUrl,
                like : 0
            }).save();

            var status = "insert success! UserName : " + req.body.patternUserName;

            res.render("pattern", {
                title: "pattern render",
                status: status
            });
        }
    });
}

// costomize post(/patternSelect)
exports.patternSelect = function (req, res) {
    Paint.find({ phone: req.body.patternUserPhone }, function (err, tasks) {
        if (err) {
            console.log("/itemSelect 에서 db find 중 발생한 err => " + err);
        }

        res.send(tasks);
    });
};

// costomize get(/patternSelect)
exports.patternMonthSelect = function (req, res) {

    console.log('in patternMonthSelect')
    var sendPattern= [];

    // now month check
    var nowDate = new Date;
    var dir = nowDate.getFullYear() + "_" + (nowDate.getMonth()+1);
    console.log(dir);

    // send every month data
    Paint.find({}, function(err, tasks) {
       // now month of all data

        tasks.forEach(function(task) {
            // same year , same month
            if(task.date.getFullYear() == nowDate.getFullYear() && task.date.getMonth() == nowDate.getMonth()) {
                sendPattern.push(task);
            }
        });

        // [issue] img file을 로드하여 배열에 더해줌

        




        res.send(sendPattern);
    }); // find
}
