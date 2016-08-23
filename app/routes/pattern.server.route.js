var paint = require('../controllers/pattern.server.controller.js');

module.exports = function (app) {
    app.get('/pattern', paint.render);
    app.get('/pattern/:id', paint.search);
    app.post('/pattern', paint.insert);
    app.put('/pattern/:id', paint.update);
    app.delete('/pattern/:id', paint.delete);
};