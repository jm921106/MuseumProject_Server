var index = require('../controllers/index.server.controller');

module.exports = function(app) {
  app.get('/', index.render);
};

module.exports = function(app) {
  app.get('/kakao', index.kakao);
};
