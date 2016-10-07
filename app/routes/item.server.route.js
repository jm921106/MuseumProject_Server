var item = require('../controllers/item.server.controller.js');

module.exports = function (app) {

    // // RestFul
    app.get('/item', item.render);
    // app.get('/item/:id', item.search);
    // app.post('/item', item.insert);
    // app.put('/item/:id', item.update);
    // app.delete('/item/:id', item.delete);

    // Customize Route
    app.post('/itemInsert', item.itemInsert);
    app.post('/itemSelect', item.itemSelect);
    
    app.post('/likeCall', item.likeCall);
    app.post('/likePlus', item.likePlus);
};

