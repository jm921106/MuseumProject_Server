var Today = require('../models/today.server.model');

exports.todayLoad = function (req, res) {
    // today +
    
    // 오늘 날짜를 확인
    var nowDate = new Date();
    var today = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate();
    
    Today.find({date : today}, function (err, tasks) {
        if(err) {
            console.log(err);
        }

        if( tasks.length > 0 ) {
            console.log('update');
            //update
            Today.update({ date : tasks[0].date }, { $set : { count : tasks[0].count + 1 }}, function() {
                res.send('update success');
            });
        } else {
            //insert
            console.log('insert');
            Today({
                date : today,
                count : 1
            }).save()
    
            res.send('insert success');
        }
    });
};

exports.todaySearch = function (req, res) {
    // today 데이터를 전송한다.

    // 오늘 날짜를 확인
    var nowDate = new Date();
    var today = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate();
    var todayArr = today.split('-');

    Today.find({date : today}, function (err, tasks) {
        // error catching
        if (err) {
            console.log(err);
        }

        var sendArr = {
            sendDateArr : [],
            sendCountArr : []
        };
        tasks.forEach(function(task) {
           var dateArr = task.date.split('-');
            // same year same month
            if( dateArr[0]==todayArr[0] && dateArr[1]==todayArr[1] ) {
                sendArr.sendDateArr.push(task.date);
                sendArr.sendCountArr.push(task.count);
            }
        });
        
        res.send(sendArr);
    });
    
}