var notice = require('../controllers/notice.server.controller.js');

module.exports = function (app) {
    app.get('/getNotice', notice.getNotice);
    app.get('/notice', notice.noticeRender);
    app.post('/noticeInsert', notice.noticeInsert);
    app.post('/noticeUpdate', notice.noticeUpdate);
    app.post('/noticeDelete', notice.noticeDelete);
    
};
