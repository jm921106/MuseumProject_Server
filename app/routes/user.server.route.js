/**
 * Created by superMoon on 2016-08-17.
 */

var user = require('../../app/controllers/user.server.controller');

module.exports = function (app) {
    app.route('/user')
        .post(user.create)
        .get(user.list);   
    
    app.route('/user/:userId')
        .get(user.read)
        .put(user.update)
        .delete(user.delete);
    
    app.param('userId', user.userByID);
};