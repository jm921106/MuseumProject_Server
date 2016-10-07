var user = require('../controllers/user.server.controller');

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