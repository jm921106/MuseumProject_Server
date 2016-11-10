var paint = require('../controllers/pattern.server.controller.js');

module.exports = function (app) {
    app.get('/pattern', paint.render);
    
    // [REST FUL]
    // app.get('/pattern/:id', paint.search);
    // app.post('/pattern', paint.insert);
    // app.put('/pattern/:id', paint.update);
    // app.delete('/pattern/:id', paint.delete);

    app.post('/patternInsert', paint.patternInsert);
    app.post('/patternSelect', paint.patternSelect);
    app.post('/patternFind', paint.patternFind);
    app.get('/patternMaxFind', paint.patternMaxFind);
    app.post('/patternMaxFind', paint.patternMaxFind);

    app.post('/patternLikeCall', paint.likeCall);
    app.post('/patternLikePlus', paint.likePlus);
};