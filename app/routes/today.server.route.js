var today = require('../controllers/today.server.controller.js');

module.exports = function (app) {
    app.get('/todayLoad', today.todayLoad);
    app.get('/todaySearch', today.todaySearch);
    app.post('/itemViewCount', today.itemViewCount);
};
