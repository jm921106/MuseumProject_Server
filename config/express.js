var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');

module.exports = function () {

    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(logger('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }


    // view engine setup
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'ejs');


    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(session({
        saveUnintialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    app.use(methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    
    // Add headers [access-control-allow-origin] 정책을 무시하기 위한 method
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader('Access-Control-Allow-Credentials', true); 

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    // require('../app/routes/user.server.route.js')(app);
    require('../app/routes/index.server.route.js')(app);
    require('../app/routes/item.server.route.js')(app);
    require('../app/routes/pattern.server.route.js')(app);
    require('../app/routes/today.server.route.js')(app);
    require('../app/routes/notice.server.route.js')(app);

    // require('./app/models/mongoDB.js').connect();

// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    return app;
}

