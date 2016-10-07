var today = require('../controllers/today.server.controller.js');

module.exports = function (app) {

    app.get('/todayLoad', today.todayLoad);

    app.post('/todaySearch', today.todaySearch);

};
